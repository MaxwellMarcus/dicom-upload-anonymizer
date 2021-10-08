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
}: PageFooterProps) => {
  const progress =
    uploadProgress.chunksSent > 0
      ? Math.ceil(
          (uploadProgress.chunksSent / uploadProgress.totalNumberOfChunks) *
            100,
        )
      : 0

  return (
    <Paper elevation={0} square className={styles.pageFooter}>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent={progress > 0 ? 'flex-start' : 'flex-end'}
        >
          {(sendingFiles || progress > 0) && (
            <Grid item xs={progress === 100 ? 8 : 12}>
              <p className={styles.progressText}>
                {progress === 100
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

          {progress === 100 && (
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

          {!sendingFiles && progress !== 100 && (
            <>
              <Grid item>
                <Button
                  onClick={() => onSubmit()}
                  disabled={sendingFiles}
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
