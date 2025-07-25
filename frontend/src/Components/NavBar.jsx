import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa"
import { CgProfile } from "react-icons/cg";
import { BiMessageAlt } from "react-icons/bi";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import '../App.css'
import { Link } from "react-router";

function NavBar() {
 

  return (
    <>
      <div className='navbar'>
        <Link className="navbar-link" to="">
          <IoMdHome id="navbar-icons"/>
          <p>Home</p>
        </Link>
        <Link className="navbar-link" to="">
          <PiBookmarkSimpleLight id="navbar-icons"/>
          <p>Bookmarks</p>
        </Link>
        <Link className="navbar-link" to="/me">
          <CgProfile id="navbar-icons"/>
          <p>Profile</p>
        </Link>
        
      </div>
    </>
  )
}

export default NavBar


