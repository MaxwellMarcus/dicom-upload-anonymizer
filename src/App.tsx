import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Upload from './components/Upload/Upload'
import styles from './App.module.css'
const App: React.FC = () => {
  return (
    <div className='App'>
      <Paper elevation={0} square>
        <Box px={2} marginTop={0}>
          <h3 className={styles.title}>Subject Data Upload</h3>
        </Box>
      </Paper>
      <Box className={styles.greyBackground} py={2}>
        <Container maxWidth='md'>
          <Upload />
        </Container>
      </Box>
    </div>
  )
}

export default App
