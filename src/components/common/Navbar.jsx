import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux" 
// component
import Usermenu from "./Usermenu";
// images
import logo from "../../assets/images/logo.png"
// stylesheet
import "../../css/navbar.css"

const Navbar = () => {

  const [shownav, setshownav] = useState(false)
  const userdata = useSelector(state => state.userDataReducer)

  return (
    <>
      <header className="header shadow-md sticky z-10">
        <div className="header__banner top-0 sticky px-5 z-10 items-center justify-between shadow-md">
          <img src={logo} />
          <div onClick={(event) => {
            setshownav((prevstate) => {
              return !prevstate
            })
          }} className="hamburgur__cont">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={`navbar-content ${shownav ? "bringnav" : ""}`} onClick={(event) => {
          setshownav((prevstate) => {
            return !prevstate
          })
        }}>
          <div className="flex justify-between items-center p-3.5 header__container">
            <div className="flex flex-row items-center">
              <div>
                <Link to={"/"}><img src={logo} className="cursor-pointer" /></Link>
              </div>
              <div className="flex items-center">
                <Link to={"/"}><p className="ml-7 font-black text-3xl tracking-widest cursor-pointer">Pizza World</p></Link>
              </div>
            </div>
            <div className="navbar-link-container flex flex-row items-center">
              <nav className="flex list-none items-center">
                <Link className="nav-link mr-8" to={"/"}>
                  <li>Home</li>
                </Link>
                <Link className="nav-link mr-8" to={"/profile"}>
                  <li>Profile</li>
                </Link>
                <Link className="nav-link mr-8" to={"/food/cart"}>
                  <li>Cart</li>
                </Link>
              </nav>
              {userdata === null ? <div>
                <Link to={"/login"}>
                  <button className="btn-primary rounded-md	py-1.5 px-2.5 mr-3.5">Login</button>
                </Link>
                <Link to={"/register"}>
                  <button className="btn-secoundry rounded-md py-1.5 px-2.5 mr-3.5">Register</button>
                </Link>
              </div> : <Usermenu/>}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
