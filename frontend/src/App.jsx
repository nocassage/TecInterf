import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './pages/Profile/Profile'
import Alarms from './pages/Alarms/Alarms'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/gir" element={Profile} />
        <Route path="/alarms" element={Alarms} />
      </Routes>
    </Router>
  )
}

export default App
