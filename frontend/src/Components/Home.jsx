import { useEffect, useState } from "react"
import '../App.css'
import { API } from '../utils'
import { CgProfile } from "react-icons/cg";
import MainPage from "./MainPage";
import NavBar from "./NavBar";


function Home({ token }) {
  return (
    <div>
      <NavBar />
      <MainPage token={token}/>
    </div>
  )
}

export default Home