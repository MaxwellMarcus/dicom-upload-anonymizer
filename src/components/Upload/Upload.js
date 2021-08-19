import { useState } from 'react'
import { script, formatFileSize, isZippedFolder } from '../../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Dropzone from 'react-dropzone'
import './Upload.module.css'
import Grid from '@material-ui/core/Grid'
import { uploadFiles } from '../../Services/UploadService'

function Upload() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [freshFiles, setFreshFiles] = useState(true)

  const anonymizer = new Anonymizer(script)
  const zip = new JSZip()
  let progressCounter = 0
  let totalCounter = 0
  let totalVolume = 0

  const onFileUpload = (uploaded) => {
    setFreshFiles(true)
    // If a zipped folder is uploaded
    if (isZippedFolder(uploaded[0])) {
      zip.loadAsync(uploaded[0]).then((zip) => {
        zip.forEach((relativePath, file) => {
          if (relativePath.includes('dcm')) {
            totalCounter++
            const fileName = file.name
            zip
              .file(file.name)
              .async('arraybuffer')
              .then(async (file) => {
                handleAnonymizing(file, fileName)
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

        reader.onload = function () {
          handleAnonymizing(reader.result, fileName)
        }

        try {
          reader.readAsArrayBuffer(file)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  /**
   *
   * @param {File} File the File object to anonymize
   * @param {string} Name the name of the file
   * @returns the new anonymized 'file'
   */
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
    setFiles((files) => [...files, { fileName, size, anonymizedFile }])
    setProgress(progressCounter)
  }

  const zipAndUpload = async (files) => {
    const zipToSend = new JSZip()
    files.forEach((file) => {
      zipToSend.file(file.fileName, file.anonymizedFile)
    })
    const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
    uploadFiles(zippedFolder)
  }

  if (freshFiles && totalFiles > 0 && progress === totalFiles) {
    setFreshFiles(false)
    zipAndUpload(files)
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
      <p>{progress} anonymized</p>

      <br />
    </>
  )
}

export default Upload
