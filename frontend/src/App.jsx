import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './pages/Profile/Profile'
{/*import Alarms from './pages/Alarms/Alarms'*/}
import User from './pages/User/User'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile/>} />
         {/*<Route path="/alarms" element={Alarms} />*/}
         <Route path="/user" element={<User/>} />
      </Routes>
    </Router>
  )
}

export default App
