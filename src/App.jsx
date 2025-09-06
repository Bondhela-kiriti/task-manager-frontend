import './App.css'
import { Routes, Route} from 'react-router-dom'
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import Dashboard  from "../src/pages/Dashbord"
import Navbar from "../src/components/Navbar"


export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </main>
  )
}
