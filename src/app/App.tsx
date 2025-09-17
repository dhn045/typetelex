import './App.css'
import TypingInterface from './components/TypingInterface'
import { VIETNAMESE_PANGRAM } from './utils/telex'

function App() {
  return (
    <>
      <TypingInterface text={VIETNAMESE_PANGRAM} />
    </>
  )
}

export default App
