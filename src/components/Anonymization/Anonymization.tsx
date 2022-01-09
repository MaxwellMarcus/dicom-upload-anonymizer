import styles from './Anonymization.module.css';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as tf from "@tensorflow/tfjs"
import * as tfn from "@tensorflow/tfjs-node"
import {useState, useEffect} from "react"
import { AnonymizationProps } from "../../myTypes"
import dicomParser from "dicom-parser"

const Anonymization: React.FC<AnonymizationProps> = ({
  files, anonScript, anonWorker, projectId, subjectId, session, selectedModality
}: AnonymizationProps) => {

  const [net, setNet] = useState<tf.GraphModel>();//tf.model({inputs: tf.input({shape: [0]}), outputs: tf.layers.dense()}));
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const text = [] as Array<number>;

  let imageData = new ImageData(1, 1);

  let width = 0;
  let height = 0;

  let run = false;

  type DCM = ReturnType<typeof dicomParser.parseDicom>;

  const dcmData = [] as Array<Int16Array>;
  // const dcms = [] as Array<DCM>
  let dcms = {};

  const anon = [anonScript]

  const getTag = (dcm: DCM, tag: string) => {
    return new Int16Array(dcm.byteArray.buffer.slice(dcm.elements[tag].dataOffset, dcm.elements[tag].dataOffset + dcm.elements[tag].length))
  }

  const loadNet = () => {
    tf.ready().then(() => {
      tf.loadGraphModel("http://127.0.0.1:8080/model/model.json").then(setNet)
    })
  }

  useEffect(() => {
    if (!net) {
      loadNet()
    }

    if (!ctx) {
      setCtx((document.getElementById("dcmCanvas") as HTMLCanvasElement).getContext("2d"))
    }
  })

  async function runNet() {
    if (run) {console.log("Alredy Run"); return}

    run = true;

    let size = 0
    dcms = {}
    for (const file of files) {
      const buffer = await file.anonymizedFile.arrayBuffer();
      const dcm = dicomParser.parseDicom(new Uint8Array(buffer));
      // if (!dcms[])
      // dcms.push(dcm)
      size += dcm.elements.x7fe00010.length / 2;
    }

    console.log(dcms)

    width = new Int16Array(dcms[0].byteArray.buffer.slice(dcms[0].elements.x00280010.dataOffset, dcms[0].elements.x00280010.dataOffset + dcms[0].elements.x00280010.length))[0];
    height = new Int16Array(dcms[0].byteArray.buffer.slice(dcms[0].elements.x00280011.dataOffset, dcms[0].elements.x00280011.dataOffset + dcms[0].elements.x00280011.length))[0];
    const canvas = document.getElementById("dcmCanvas") as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;


    let min = Infinity;
    let max = -Infinity;

    const data = new Int16Array(size)
    let point = 0

    for (const dcm of dcms) {
      const d = new Int16Array(dcm.byteArray.buffer, dcm.elements.x7fe00010.dataOffset, dcm.elements.x7fe00010.length / 2)
      dcmData.push(d)
      data.set(d, point);
      point += dcm.elements.x7fe00010.length / 2;

      for (let i = 0; i < d.length; i++) {
        if (d[i] > max) {
          max = d[i];
        }
        if (d[i] < min) {
          min = d[i]
        }
      }
    }

    let t = tf.tensor4d(new Int32Array(data), [files.length, width, height, data.length / (files.length * width * height)]);
    t = tf.div(tf.sub(t, tf.scalar(min)), tf.scalar(max / 255)) as tf.Tensor4D;

    const pred = []
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 16) {
        let input = tf.slice(t, [0, y, x], [files.length, 16, 32])

        input = tf.image.resizeBilinear(input, [32, 64])

        const out = net.execute(input) as tf.Tensor
        pred.push(tf.mean(tf.slice(out, [0, 0], [files.length, 1])).dataSync()[0])
        if (pred[pred.length - 1] > 0.5) {
          console.log(x, y)
          anon.push(`alterPixels[ "rectangle", "l=${x}, t=${y}, r=${x + 32}, b=${y + 16}", "solid", "v=100"]`)
        }
      }
    }


    const grayPixelData = new Int16Array(dcms[0].byteArray.buffer, dcms[0].elements.x7fe00010.dataOffset, dcms[0].elements.x7fe00010.length / 2)
    const rgbaPixelData = new Int16Array(grayPixelData.length * 4);
    point = 0;
    for (const p of grayPixelData) {
      rgbaPixelData.set([((p - min) / max) * 255, ((p - min) / max) * 255, ((p - min) / max) * 255, 255], point);
      point += 4;
    }
    console.log(rgbaPixelData)

    imageData = new ImageData(new Uint8ClampedArray(rgbaPixelData), width, height)
    ctx.putImageData(imageData, 0, 0);

    for (let i = 0; i < pred.length; i++) {
      if (pred[i] > 0.5) {
        text.push(i)
      }
    }

    renderDcm();

    document.getElementById("dcmCanvas").onclick = (e) => {
      const x = Math.floor(e.offsetX / 32);
      const y = Math.floor(e.offsetY / 16);

      const n = (y * Math.floor(width / 32)) + x

      const i = text.indexOf(n)
      console.log(text)
      console.log(i)
      if (i == -1) {
        text.push(n)
      } else {
        text.splice(i, 1)
      }

      renderDcm();
    }

    // document.getElementById("subButton").disabled = false;
    document.getElementById("subButton").onclick = (e) => {
      anonWorker.postMessage({
        projectId,
        subjectId,
        session,
        uploaded: files,
        anonScript: anon.join("\n"),
        selectedModality,
        anonymize: true,
      })
    }
  }
  //dcm.byteArray.buffer.slice(dcm.elements[element].dataOffset, dcm.elements[element].dataOffset + dcm.elements[element].length)

  const renderDcm = () => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.putImageData(imageData, 0, 0);

    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 1;
    for (const pos of text) {
      const y = pos % Math.floor(height / 16);
      const x = Math.floor(pos / Math.floor(height / 16));
      ctx.strokeRect(x * 32 + 2, y * 16 + 2, 28, 14)
    }
  }

  // const submit = () => {
  //   console.log(text)
  //   for (const pos of text) {
  //     const x = pos % Math.floor(width / 32);
  //     const y = Math.floor(pos / Math.floor(width / 32));
  //     dcmData = dcmData.map((im) => {
  //       for (let i = y; i < y + 16; i++) {
  //         for (let l = x; l < x + 32; l++) {
  //           im[(y * Math.floor(width / 32)) + x] = 0
  //         }
  //       }
  //       return im;
  //     })
  //   }
  //   for (let i = 0; i < dcms.length; i++) {
  //     dcms[i].byteArray.set(dcmData[i], dcms[i].elements.x7fe00010.dataOffset)
  //   }
  //
  //   const pixelData = new Uint8Array(dcms[10].byteArray.buffer, dcms[10].elements.x7fe00010.dataOffset, dcms[10].elements.x7fe00010.length / 2)
  //   const testCtx = (document.getElementById("testCanvas") as HTMLCanvasElement).getContext('2d')
  //
  //   const rgbaPixelData = new Int16Array(pixelData.length * 4);
  //   let point = 0;
  //   for (const p of pixelData) {
  //     rgbaPixelData.set([p, p, p, 255], point);
  //     point += 4;
  //   }
  //
  //   const newImDat = new ImageData(new Uint8ClampedArray(rgbaPixelData), width, height)
  //   testCtx.putImageData(newImDat, 0, 0)
  // }

  return (
    <Paper elevation={0} square style={{backgroundColor: "black"}}>
      <Container>
        <Grid container spacing={3} justifyContent='flex-start'>
          {!net && (<p>
              Loading Net...
            </p>)
          }

          {net && (
            <p>
              Ready
            </p>
          )}
          <canvas width={512} height={512} id="dcmCanvas"></canvas>
          <button disabled={!files || !ctx || run} onClick={runNet}>Go!</button>
          <button disabled={false} id="subButton">Sub</button>
          <canvas width={256} height={256} id="testCanvas"></canvas>
        </Grid>
      </Container>
    </Paper>
  )
};

export default Anonymization;
