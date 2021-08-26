import { useState, useEffect } from 'react'
import { getSiteWideAnonScript, uploadFiles } from '../../Services'
import { formatFileSize, isZippedFolder, msToMinutes } from '../../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Dropzone from 'react-dropzone'
import styles from './Upload.module.css'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InputFields from '../InputFields/InputFields'

function Upload() {
  const [files, setFiles] = useState([])
  const [numOfAnonomyzedFiles, setNumOfAnonomyzedFiles] = useState(null)
  const [totalFiles, setTotalFiles] = useState(null)
  const [anonScript, setAnonScript] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [dateTime, setDateTime] = useState(null)

  const zip = new JSZip()
  let progressCounter = 0
  let totalCounter = 0
  let totalVolume = 0

  /**
   * retreive the site-wide anon script on app load
   */
  useEffect(() => {
    getSiteWideAnonScript()
      .then((response) => response.text())
      .then((text) => {
        const scriptStart = text.indexOf('version')
        const parsedScript = text.substring(scriptStart)
        setAnonScript(parsedScript)
      })
  }, [])

  const onFileUpload = (uploaded) => {
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
        const reader = new FileReader()
        const file = uploaded[i]
        const fileName = file.name
        const lastModified = file.lastModified

        reader.onload = function () {
          handleAnonymizing(reader.result, fileName, lastModified)
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
  const handleAnonymizing = async (file, name, lastModified) => {
    const anonymizer = new Anonymizer(anonScript)
    const fileName = name
    anonymizer.loadDcm(file)
    await anonymizer.applyRules()
    const outputBuffer = anonymizer.write()
    const anonymizedFile = new Blob([outputBuffer], {
      type: 'application/octet',
    })
    let size = anonymizedFile.size
    progressCounter++
    setFiles((files) => [
      ...files,
      { fileName, size, lastModified, anonymizedFile },
    ])
    setNumOfAnonomyzedFiles(progressCounter)
  }

  /**
   * watches for the files state to change, and handles the
   * zipping and uploading when all files are read into memory
   */
  // useEffect(() => {
  //   if (files.length === totalFiles) {
  //     zipAndUpload(files)
  //   }
  // }, [files.length])

  /**
   *
   * @param {files} files - the files to zip and upload
   */
  const zipAndUpload = async (files) => {
    const zipToSend = new JSZip()
    files.forEach((file) => {
      zipToSend.file(file.fileName, file.anonymizedFile)
    })
    const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
    uploadFiles(projectId, subjectId, zippedFolder)
  }

  if (files.length > 0) {
    files.forEach((file) => (totalVolume += file.size))
  }

  const isUploadDisabled = !(anonScript && projectId && subjectId && dateTime)

  const fileVsVerifyTimeDiff =
    files[0] &&
    Math.abs(msToMinutes(files[0].lastModified) - msToMinutes(dateTime))

  return (
    <>
      <Paper elevation={5}>
        <Box p={2}>
          <InputFields
            setProjectId={setProjectId}
            setSubjectId={setSubjectId}
            setDateTime={setDateTime}
          />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper elevation={5}>
                <Dropzone
                  disabled={isUploadDisabled}
                  onDrop={(acceptedFiles) => onFileUpload(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className={`${styles.centerText} ${
                        isUploadDisabled ? styles.disabled : ''
                      }`}
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isUploadDisabled && (
                          <p>Fill out the above fields to upload files</p>
                        )}
                        {!isUploadDisabled && (
                          <p>
                            Drag&apos;n&apos;drop some files here, or click to
                            select files
                          </p>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <p>
                <b>{formatFileSize(totalVolume)}</b> total upload size
              </p>
              <p>
                <b>{totalFiles}</b> file(s) selected
              </p>
              <p>
                <b>{numOfAnonomyzedFiles}</b> file(s) anonymized
              </p>
            </Grid>
          </Grid>

          {files.length > 0 && (
            <div className={styles.largerText}>
              <p>
                File vs Verification time difference - {fileVsVerifyTimeDiff}{' '}
                minutes (max difference allowed is 120)
              </p>
            </div>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default Upload
