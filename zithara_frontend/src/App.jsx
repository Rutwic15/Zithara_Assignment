import { Routes, Route} from 'react-router-dom';
import Details from "./components/Details"
function App() {
  return (
      <Routes>
        <Route path='/' element={<Details/>}/>
      </Routes>
  )
}

export default App
