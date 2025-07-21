import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Home from './Components/Home'


function App() {
  return (
    <div className='app-container'>
      <Sidebar />
      <div className='main-content'>
        <Home />
      </div>
    </div>
  )
}
export default App
