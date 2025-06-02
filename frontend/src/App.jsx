import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './pages/Profile/Profile'
import Alarm from './pages/Alarm/Alarm'
import User from './pages/User/User'
import Mensagens from './pages/Mensagens/Mensagens'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile/>} />
         <Route path="/alarms" element={<Alarm/>} />
         <Route path="/user" element={<User/>} />
         <Route path="/sms" element={<Mensagens/>} />
      </Routes>
    </Router>
  )
}

export default App
