import { PageFooterProps } from '../../myTypes'
import styles from './PageFooter.module.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'

const PageFooter: React.FC<PageFooterProps> = ({
  sendingFiles,
  onSubmit,
  resetAllData,
  uploadProgress,
  readyToUpload,
}: PageFooterProps) => {
  const progress =
    uploadProgress.chunksSent > 0
      ? Math.ceil(
          (uploadProgress.chunksSent / uploadProgress.totalNumberOfChunks) *
            100,
        )
      : 0

  const uploadInProgress = progress > 0 && progress < 100
  const uploadComplete = progress === 100

  return (
    <Paper elevation={0} square className={styles.pageFooter}>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent={uploadInProgress ? 'flex-start' : 'flex-end'}
        >
          {(sendingFiles || uploadInProgress) && (
            <Grid item xs={uploadComplete ? 8 : 12}>
              <p className={styles.progressText}>
                {uploadComplete
                  ? 'Upload Complete'
                  : 'Uploading Anonymized Imaging Files and Metadata Form'}
              </p>
              <Box display='flex' alignItems='baseline'>
                <Box>{progress}%</Box>
                <Box width='100%' marginLeft={1}>
                  <LinearProgress
                    variant='determinate'
                    value={progress}
                    className={styles.progressBar}
                  />
                </Box>
              </Box>
            </Grid>
          )}

          {uploadComplete && (
            <Grid item xs={4} className={styles.newUploadContainer}>
              <Button
                onClick={() => resetAllData()}
                variant='contained'
                style={{ textTransform: 'none' }}
                className={styles.newSubjectDataUpload}
              >
                New Subject Data Upload
              </Button>
            </Grid>
          )}

          {!sendingFiles && !uploadComplete && (
            <>
              <Grid item>
                <Button
                  onClick={() => onSubmit()}
                  disabled={sendingFiles || !readyToUpload}
                  variant='contained'
                  style={{ textTransform: 'none' }}
                  className={styles.uploadSubjectData}
                >
                  Upload Subject Data
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => resetAllData()}
                  disabled={sendingFiles}
                  variant='outlined'
                  style={{ textTransform: 'none' }}
                  className={styles.resetAllData}
                >
                  Reset
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Paper>
  )
}

export default PageFooter
