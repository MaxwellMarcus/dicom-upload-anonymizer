import './App.css'
import Container from '@material-ui/core/Container'
import Upload from './components/Upload/Upload'

function App() {
  return (
    <div className='App'>
      <Container>
        <div id='todaysDate'></div>
        <Upload />
      </Container>
    </div>
  )
}

export default App
