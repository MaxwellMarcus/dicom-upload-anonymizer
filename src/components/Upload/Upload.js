import { useState } from 'react'
import { script, formatFileSize } from '../../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Dropzone from 'react-dropzone'
import './Upload.module.css'
import Grid from '@material-ui/core/Grid'
import { singleFileUpload } from '../../Services/UploadService'

function Upload() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)

  const anonymizer = new Anonymizer(script)
  let progressCounter = 0
  let totalCounter = 0
  let totalVolume = 0

  const onFileUpload = async (uploaded) => {
    // If a zipped folder is uploaded
    if (uploaded[0].type.includes('zip')) {
      const zip = new JSZip()

      zip.loadAsync(uploaded[0]).then((zip) => {
        zip.forEach((relativePath, file) => {
          if (relativePath.includes('dcm')) {
            totalCounter++
            const fileName = file.name
            zip
              .file(file.name)
              .async('arraybuffer')
              .then(async (file) => {
                const anonFile = await handleAnonymizing(file, fileName)
                singleFileUpload(anonFile)
              })
          }
        })
        setTotalFiles(totalCounter)
      })
    } else {
      // one/many not-zipped dcm files are uploaded
      for (let i = 0; i < uploaded.length; i++) {
        setTotalFiles(uploaded.length)
        let reader = new FileReader()
        let file = uploaded[i]
        let fileName = file.name

        reader.onload = async function () {
          const anonFile = await handleAnonymizing(reader.result, fileName)
          singleFileUpload(anonFile)
        }

        try {
          reader.readAsArrayBuffer(file)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const handleAnonymizing = async (file, name) => {
    const fileName = name
    anonymizer.loadDcm(file)
    await anonymizer.applyRules()
    const outputBuffer = anonymizer.write()
    const anonymizedFile = new Blob([outputBuffer], {
      type: 'application/octet',
    })
    let size = anonymizedFile.size
    progressCounter++
    setProgress(progressCounter)
    setFiles((files) => [...files, { fileName, size, anonymizedFile }])
    return anonymizedFile
  }

  if (files.length > 0) {
    files.forEach((file) => (totalVolume += file.size))
  }

  return (
    <>
      <div>
        <p>Script Being Used</p>
        <p>{script}</p>
      </div>

      <Grid container justifyContent='center'>
        <Grid item xs={6}>
          <Dropzone onDrop={(acceptedFiles) => onFileUpload(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Drag&apos;n&apos;drop some files here, or click to select
                    files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </Grid>
      </Grid>

      <br />

      <p>total upload size - {formatFileSize(totalVolume)}</p>
      <p>{totalFiles} files selected</p>
      <p>{progress} uploaded and anonymized</p>

      <br />
    </>
  )
}

export default Upload
