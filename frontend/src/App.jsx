import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './pages/Profile/Profile'
import Alarms from './pages/Alarms/Alarms'
import User from './pages/User/User'
import Mensagens from './pages/Mensagens/Mensagens'
import Notificacao from './pages/Notificacao/Notificacao'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile/>} />
         <Route path="/alarms" element={<Alarms/>} />
         <Route path="/user" element={<User/>} />
         <Route path="/sms" element={<Mensagens/>} />
         <Route path="/notif" element={<Notificacao/>} />
      </Routes>
    </Router>
  )
}

export default App
