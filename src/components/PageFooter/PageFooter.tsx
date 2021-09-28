import { PageFooterProps } from '../../myTypes'
import styles from './PageFooter.module.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const PageFooter: React.FC<PageFooterProps> = ({
  sendingFiles,
  onSubmit,
  resetAllData,
}: PageFooterProps) => {
  return (
    <Paper elevation={0} square className={styles.pageFooter}>
      <Container>
        <Grid container spacing={3} justifyContent='flex-end'>
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
        </Grid>
      </Container>
    </Paper>
  )
}

export default PageFooter
