import React from 'react'
import { Outlet, Link } from 'react-router-dom'
// images
import logo from "../../assets/images/logo.png"

const Checkoutpage = () => {
    return (
        <div className='checkout__page-cont'>
            <div className="flex flex-row items-center mb-5 shadow-md">
                <div>
                    <Link to={"/"}><img src={logo} className="cursor-pointer" /></Link>
                </div>
                <div className="flex items-center">
                    <Link to={"/"}><p className="ml-7 font-black text-3xl tracking-widest cursor-pointer">Pizza World</p></Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Checkoutpage