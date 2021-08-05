import { useState } from 'react'
import { script } from '../../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Dropzone from 'react-dropzone'
import './Upload.module.css'
import Grid from '@material-ui/core/Grid';


function Upload() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)

  const onFileUpload = async (uploaded) => {


    // If a zipped folder is uploaded
    if (uploaded[0].type.includes('zip')) {
      const zip = new JSZip()
      let totalCounter = 0
      let progressCounter = 0

      zip.loadAsync(uploaded[0]).then((zip) => {
        zip.forEach((relativePath, file) => {
          if (relativePath.includes('dcm')) {
            totalCounter++
            const fileName = file.name
            zip
              .file(file.name)
              .async('arraybuffer')
              .then((file) => {
                const anonymizer = new Anonymizer(script)
                anonymizer.loadDcm(file)
                anonymizer.applyRules()
                const output = anonymizer.outputDict
                progressCounter++
                setProgress(progressCounter)
                setFiles((files) => [...files, { fileName, output }])
                console.log(fileName, anonymizer.outputDict)
                // arrayBuffer = anonymizer.write()
              })
          }
        })
        setTotalFiles(totalCounter)
      })
    } else {
      // one/many not-zipped dcm files are uploaded
      let progressCounter = 0
      for (let i = 0; i < uploaded.length; i++) {
        setTotalFiles(uploaded.length)
        let reader = new FileReader()
        const anonymizer = new Anonymizer(script)
        let file = uploaded[i]
        let fileName = file.name

        reader.onload = async function () {
          anonymizer.loadDcm(reader.result)
          await anonymizer.applyRules()
          const output = anonymizer.outputDict
          progressCounter++
          setProgress(progressCounter)
          setFiles((files) => [...files, { fileName, output }])
          console.log(file.name, anonymizer.outputDict)
          // const response = await UploadService(file)
          // console.log('response ', response)
          // arrayBuffer = anonymizer.write()
        }

        reader.onerror = function (error) {
          console.log('onerror error ', error)
        }

        try {
          reader.readAsArrayBuffer(file)
        } catch (error) {
          console.log('catch error ', error)
        }
      }
    }
  }

  return (
    <>
      <div>
        <p>Script Being Used</p>
        <p>{script}</p>
      </div>

      <Grid container justifyContent='center'>
        <Grid item xs={6}>
          <Dropzone onDrop={acceptedFiles => onFileUpload(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag&apos;n&apos;drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </Grid>
      </Grid>

      <br />

      <p>{totalFiles} files selected</p>
      <p>{progress} uploaded and anonymized</p>

      <br />
    </>
  )
}

export default Upload
