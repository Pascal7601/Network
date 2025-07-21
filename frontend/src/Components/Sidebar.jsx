import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa"
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
        </div>}
    </>
  )
}

export default Sidebar


