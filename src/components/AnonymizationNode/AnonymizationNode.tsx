import styles from './Anonymization.module.css';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as tf from "@tensorflow/tfjs"
import * as tfn from "@tensorflow/tfjs-node"
import {useState, useEffect, SetStateAction, Dispatch} from "react"
import dicomParser from "dicom-parser"

type DCM = ReturnType<typeof dicomParser.parseDicom>;
type AnonymizationNodeProps = {dcms: Array<DCM>, size: number, series: string, net: tf.GraphModel, checked: {[key: string]: number}, setChecked: Dispatch<SetStateAction<{[key: string]: number}>>};

const AnonymizationNode: React.FC<AnonymizationNodeProps> = ({
  dcms, size, series, net, setChecked, checked
}: AnonymizationNodeProps) => {

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [run, setRun] = useState(false);

  const text = [] as Array<number>;

  let imageData = new ImageData(1, 1);

  let width = 0;
  let height = 0;

  const dcmData = [] as Array<Int16Array>;


  const getTag = (dcm: DCM, tag: string) => {
    return new Int16Array(dcm.byteArray.buffer.slice(dcm.elements[tag].dataOffset, dcm.elements[tag].dataOffset + dcm.elements[tag].length))
  }

  useEffect(() => {
    if (!ctx) {
      setCtx((document.getElementById(series + "Thumbnail") as HTMLCanvasElement).getContext("2d"))
    }
    if (ctx && !run) {
      runNet()
    }
  })

  async function runNet() {
    setRun(true);

    width = new Int16Array(dcms[0].byteArray.buffer.slice(dcms[0].elements.x00280010.dataOffset, dcms[0].elements.x00280010.dataOffset + dcms[0].elements.x00280010.length))[0];
    height = new Int16Array(dcms[0].byteArray.buffer.slice(dcms[0].elements.x00280011.dataOffset, dcms[0].elements.x00280011.dataOffset + dcms[0].elements.x00280011.length))[0];

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

    let t = tf.tensor4d(new Int32Array(data), [dcms.length, width, height, data.length / (dcms.length * width * height)]);
    t = tf.div(tf.sub(t, tf.scalar(min)), tf.scalar(max / 255)) as tf.Tensor4D;

    const pred = []
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 16) {
        let input = tf.slice(t, [0, y, x], [dcms.length, 16, 32])

        input = tf.image.resizeBilinear(input, [32, 64])

        const out = net.execute(input) as tf.Tensor
        pred.push(tf.mean(tf.slice(out, [0, 0], [dcms.length, 1])).dataSync()[0])
      }
    }


    const grayPixelData = new Int16Array(dcms[0].byteArray.buffer, dcms[0].elements.x7fe00010.dataOffset, dcms[0].elements.x7fe00010.length / 2)
    const rgbaPixelData = new Int16Array(grayPixelData.length * 4);
    point = 0;
    for (const p of grayPixelData) {
      rgbaPixelData.set([((p - min) / max) * 255, ((p - min) / max) * 255, ((p - min) / max) * 255, 255], point);
      point += 4;
    }

    imageData = new ImageData(new Uint8ClampedArray(rgbaPixelData), width, height)

    for (let i = 0; i < pred.length; i++) {
      if (pred[i] > 0.5) {
        text.push(i)
      }
    }

    setChecked({...checked, [series]: (!text.length) ? 1 : 0})

    renderDcm();

    document.getElementById(series + "Thumbnail").onclick = (e) => {
      const pop = document.getElementById(series + "popup");
      for (const other of document.getElementsByClassName("PopUp") as HTMLCollectionOf<HTMLElement>) {
        if (pop === other) {
          pop.style.display = "inline";
          setChecked(Object.assign(checked, {[series]: 2}))
        } else {
          other.style.display = "none";
        }
      }

      console.log(pop)
      console.log(pop.style)

    }

    document.getElementById(series + "Canvas").onclick = (e) => {
      console.log(e)

      const i = Math.floor((width / 32) * (e.offsetX  / (e.srcElement as HTMLCanvasElement).width)) * Math.floor(height / 16) + Math.floor((height / 16) * (e.offsetY / (e.srcElement as HTMLCanvasElement).height));
      const index = text.indexOf(i);

      if (index >= 0) {
          text.splice(index, 1);
      } else {
        text.push(i)
      }
      console.log(text)
      renderDcm();
    }
  }
  //dcm.byteArray.buffer.slice(dcm.elements[element].dataOffset, dcm.elements[element].dataOffset + dcm.elements[element].length)

  const closeAll = () => {
    for (const pop of document.getElementsByClassName("PopUp") as HTMLCollectionOf<HTMLElement>) {
      pop.style.display = "none";
    }
  }

  const renderDcm = () => {
    const thumbnail = document.getElementById(series + "Thumbnail") as HTMLCanvasElement;
    ctx.clearRect(0, 0, thumbnail.width, thumbnail.height);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const hiddenCanvas = document.getElementById(series + "HiddenCanvas") as HTMLCanvasElement;
    hiddenCanvas.width = width;
    hiddenCanvas.height = height;
    const hiddenCtx = hiddenCanvas.getContext("2d")
    hiddenCtx.putImageData(imageData, 0, 0);

    hiddenCtx.strokeStyle = "#ff0000";
    hiddenCtx.lineWidth = 1;
    for (const pos of text) {
      const y = pos % Math.floor(height / 16);
      const x = Math.floor(pos / Math.floor(height / 16));
      hiddenCtx.strokeRect(x * 32 + 2, y * 16 + 2, 28, 14)
    }

    const canvas = document.getElementById(series + "Canvas") as HTMLCanvasElement;
    const canvasCtx = canvas.getContext("2d");

    canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
    canvasCtx.scale(canvas.width / width, canvas.height / height);
    canvasCtx.drawImage(hiddenCanvas, 0, 0);

    ctx.scale(thumbnail.width / width, thumbnail.height / height)
    ctx.drawImage(hiddenCanvas, 0, 0);

  }

  return (
    <div>
      <canvas style={{display: "none"}} id={series + "HiddenCanvas"}></canvas>
      <Paper elevation={0} square style={{backgroundColor: "purple"}}>
        <Container>
          <Grid container spacing={3} justifyContent='flex-start'>
            <canvas width={128} height={128} id={series + "Thumbnail"} style={{backgroundColor: "yellow", padding: "10px"}}></canvas>
          </Grid>
        </Container>
      </Paper>
      <div id={series+"popup"} className="PopUp" style={{display: "none"}}>
        <p onClick={closeAll} style={{color: "red", fontSize: "20px", justifyContent: "end", padding: "5px", userSelect: "none", cursor: "pointer"}}>&times;</p>
        <canvas width="512" height="512" id={series + "Canvas"}></canvas>
      </div>
    </div>
  )
};

export default AnonymizationNode;
