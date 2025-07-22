import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Home from './Components/Home'
import { Routes, Route, Navigate } from 'react-router'
import SignIn from './Components/SignIn'



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if(token) {
      localStorage.getItem('token');
    } else {
      localStorage.removeItem('token');
    }
  }, [token])

  return (
    <div className='app-container'>
      {token && <Sidebar />}
      <div className='main-content'>
        <Routes>
          <Route path='/' element={token ? <Home /> : < Navigate to='/login' />} />
          <Route path='/login' element={<SignIn setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
