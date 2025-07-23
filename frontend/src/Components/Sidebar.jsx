import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa"
import { CgProfile } from "react-icons/cg";
import { BiMessageAlt } from "react-icons/bi";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import '../App.css'

function Sidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleSideBar = () => {
    setIsVisible(!isVisible);
  }
  return (
    <>
      <GiHamburgerMenu  className='hambugger-menu' onClick={toggleSideBar}/>
      {isVisible &&
        <div className='sidebar'>
          <div>
            <IoMdHome id="sidebar-icons"/>
            <p>Home</p>
          </div>
          <div>
            <FaSearch id="sidebar-icons"/>
            <p>Explore</p>
          </div>
          <div>
            <BiMessageAlt id="sidebar-icons"/>
            <p>Messages</p>
          </div>
          <div>
            <PiBookmarkSimpleLight id="sidebar-icons"/>
            <p>Bookmark</p>
          </div>
          <div>
            <CgProfile id="sidebar-icons"/>
            <p>Profile</p>
          </div>
          
        </div>}
    </>
  )
}

export default Sidebar


