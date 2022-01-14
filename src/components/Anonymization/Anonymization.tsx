import styles from './Anonymization.module.css';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as tf from "@tensorflow/tfjs"
import * as tfn from "@tensorflow/tfjs-node"
import {useState, useEffect, useReducer} from "react"
import { AnonymizationProps } from "../../myTypes"
import dicomParser from "dicom-parser"
import AnonymizationNode from "../AnonymizationNode/AnonymizationNode"

const Anonymization: React.FC<AnonymizationProps> = ({
  files, anonScript, anonWorker, projectId, subjectId, session, selectedModality
}: AnonymizationProps) => {

  const [net, setNet] = useState<tf.GraphModel>();//tf.model({inputs: tf.input({shape: [0]}), outputs: tf.layers.dense()}));

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const text = [] as Array<number>;

  let imageData = new ImageData(1, 1);

  let width = 0;
  let height = 0;

  const [run, setRun] = useState(false);

  const [nodes, setNodes] = useState([] as Array<JSX.Element>);

  type DCM = ReturnType<typeof dicomParser.parseDicom>;
  type SERIES = {dcms: Array<DCM>, size: number}
  type SERIES_OBJ = {[key: number]: SERIES};

  const dcmData = [] as Array<Int16Array>;
  let dcms = {} as SERIES_OBJ;
  // let dcms = [] as Array<Array<DCM>>;
  // let series = [] as Array<number>;

  const anon = [anonScript]

  type CHECK_TYPE = {[key: string]: number}
  const [nodeChecks, setNodeChecks] = useState<CHECK_TYPE>({})

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

    if (files && !run) {
      runNet()
    }

    console.log(nodeChecks)
  })

  async function runNet() {
    if (run) {console.log("Alredy Run"); return}

    setRun(true)

    dcms = {} as SERIES_OBJ;
    for (const file of files) {
      const buffer = await file.anonymizedFile.arrayBuffer();
      const dcm = dicomParser.parseDicom(new Uint8Array(buffer));
      const seriesNum = getTag(dcm, "x00200011")[0];
      console.log(seriesNum)

      if (!Object.keys(dcms).includes(seriesNum.toString())) {
        dcms[seriesNum] = {dcms: [], size: 0} as SERIES;
      }
      dcms[seriesNum].dcms.push(dcm)

      dcms[seriesNum].size += dcm.elements.x7fe00010.length / 2;
    }

    let key = 0
    for (const series of Object.values(dcms)) {
      console.log("Key: ", key);
      nodes.push(<AnonymizationNode key={key} dcms={series.dcms} size={series.size} series={Object.keys(dcms)[key]} net={net} checked={nodeChecks} setChecked={setNodeChecks}></AnonymizationNode>)
      key++;
      forceUpdate();
    }

    width = 0
    height = 0
    imageData = new ImageData(1, 1);
  }

  return (
    <div>
      <Paper elevation={0} square style={{margin: "15px"}}>
        <Container style={{display: "block"}}>
          <Grid container spacing={3} justifyContent="flex-start">
            {nodes}
          </Grid>
        </Container>
      </Paper>
      <div>
        <button disabled={false} id="subButton" style={{display: "block", margin: "50px"}}>Submit</button>
      </div>
    </div>
  )
};

export default Anonymization;
