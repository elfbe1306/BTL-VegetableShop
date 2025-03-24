import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/info' element={<InfoPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
