import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Home from './Components/Home'
import { Routes, Route, Navigate } from 'react-router'
import SignIn from './Components/SignIn'
import Profile from './Components/Profile'



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token])

  return (
    <div className='app-container'>
      {token && <Sidebar />}
      <div className='main-content'>
        <Routes>
          <Route path='/' element={token ? <Home token={token}/> : < Navigate to='/login' />} />
          <Route path='/login' element={<SignIn setToken={setToken} />} />
          <Route path='/me' element={token ? <Profile token={token} /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
