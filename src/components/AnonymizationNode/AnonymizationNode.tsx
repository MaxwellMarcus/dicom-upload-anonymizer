import styles from './Anonymization.module.css';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as tf from "@tensorflow/tfjs"
import * as tfn from "@tensorflow/tfjs-node"
import {useState, useEffect, SetStateAction, Dispatch, useReducer} from "react"

type DCM = any;
type AnonymizationNodeProps = {dcms: Array<DCM>, size: number, series: string, net: tf.GraphModel, checked: () => {[key: string]: number}, setChecked: (k: string, v: number) => void, setAnon: (k: string, v: string) => void};

const AnonymizationNode: React.FC<AnonymizationNodeProps> = ({
  dcms, size, series, net, setChecked, checked, setAnon
}: AnonymizationNodeProps) => {

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [run, setRun] = useState(false);

  const text = [] as Array<number>;

  let imageData = new ImageData(1, 1);

  let width = 0;
  let height = 0;

  const dcmData = [] as Array<Record<any, any>>;

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  let anon = "";


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

	console.log( dcms[ 0 ] );

    width = dcms[ 0 ].getCols();
    height = dcms[ 0 ].getRows();

    const data = new Uint8Array( size )
    let point = 0

	console.log( size );

	const channels = dcms[ 0 ].getInterpretedData( true ).length / ( width * height );

    for (const dcm of dcms) {
      const d = dcm.getInterpretedData( false, true );
		console.log( d );
		const grayscale = new Uint8ClampedArray( d.data.length / channels );

      for (let i = 0; i < d.data.length; i += channels ) {
		let v = 0;
		for ( let l = 0; l < channels; l++ ) {
			v += d.data[ i + l ];
		}
		v /= channels;
		v = 255 * ( v - d.min ) / ( d.max - d.min )
		grayscale.set( [ v ], i / channels );
      }
      dcmData.push( { obj: d, grayscale: grayscale } );
		console.log( grayscale.length, point );
      data.set(grayscale, point);
      point += d.length / channels;
    }

    let t = tf.tensor4d( new Int32Array(data), [dcms.length, width, height, channels ] );
    t = tf.div(tf.sub(t, tf.scalar( dcmData[ 0 ].obj.min )), tf.scalar( ( dcmData[ 0 ].obj.max - dcmData[ 0 ].obj.min ) / 255)) as tf.Tensor4D;

    const pred = []
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 16) {
        let input = tf.slice(t, [0, y, x], [dcms.length, 16, 32])

        input = tf.image.resizeBilinear(input, [32, 64])

        const out = net.execute(input) as tf.Tensor
        pred.push(tf.mean(tf.slice(out, [0, 0], [dcms.length, 1])).dataSync()[0])
      }
    }

	const rgbaPixelData = new Uint8ClampedArray( width * height * 4 );
	for ( let i = 0; i < dcmData[ 0 ].grayscale.length; i++ ) {
		const v = dcmData[ 0 ].grayscale[ i ];
		rgbaPixelData.set( [ v, v, v, 255 ], i * 4 );
	}

    imageData = new ImageData( rgbaPixelData, width, height)

    for (let i = 0; i < pred.length; i++) {
      if (pred[i] > 0.5) {
        text.push(i)
      }
    }

    setChecked(series, (!text.length) ? 1 : 0)

    renderDcm();

    document.getElementById(series + "Thumbnail").onclick = (e) => {
      const pop = document.getElementById(series + "popup");
      for (const other of document.getElementsByClassName("PopUp") as HTMLCollectionOf<HTMLElement>) {
        if (pop === other) {
          pop.style.display = "inline";
          setChecked(series, 2);
          forceUpdate();
        } else {
          other.style.display = "none";
        }
      }
    }

    document.getElementById(series + "Canvas").onclick = (e) => {
      const i = Math.floor((width / 32) * (e.offsetX  / (e.srcElement as HTMLCanvasElement).width)) * Math.floor(height / 16) + Math.floor((height / 16) * (e.offsetY / (e.srcElement as HTMLCanvasElement).height));
      const index = text.indexOf(i);

      if (index >= 0) {
          text.splice(index, 1);
      } else {
        text.push(i)
      }
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
      anon += `(0020,0011) = "${series}" ? alterPixels[ "rectangle", "l=${x * 32}, t=${y * 16}, r=${x * 32 + 32}, b=${y * 16 + 16}", "solid", "v=100"]\n`
    }

    setAnon(series, anon);

    const canvas = document.getElementById(series + "Canvas") as HTMLCanvasElement;
    const canvasCtx = canvas.getContext("2d");

    canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
    canvasCtx.scale(canvas.width / width, canvas.height / height);
    canvasCtx.drawImage(hiddenCanvas, 0, 0);

    ctx.scale(thumbnail.width / width, thumbnail.height / height)
    ctx.drawImage(hiddenCanvas, 0, 0);

  }

  const OUTLINE_COLOR = ["red", "yellow", "green"]

  return (
    <div>
      <canvas style={{display: "none"}} id={series + "HiddenCanvas"}></canvas>
      <Paper elevation={0} square style={{backgroundColor: "purple"}}>
        <Container>
          <Grid container spacing={3} justifyContent='flex-start'>
            <canvas width={128} height={128} id={series + "Thumbnail"} style={{backgroundColor: OUTLINE_COLOR[checked()[series]], padding: "10px"}}></canvas>
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
