import React from 'react'
import { Outlet } from 'react-router-dom'
// component
import Adminnav from "./Adminnav"

const Adminpages = () => {
  return (
    <>
    <Adminnav />
    <Outlet />
    </>
  )
}

export default Adminpages