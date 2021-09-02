import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Upload from './components/Upload/Upload'

function App() {
  return (
    <div className='App'>
      <Box py={2}>
        <Container>
          <Upload />
        </Container>
      </Box>
    </div>
  )
}

export default App
