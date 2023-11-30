import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import Loadingscreen from '../common/Loadingscreen'

const Adminprofile = () => {
  const userdata = useSelector(state => state.userDataReducer)
  return (
      userdata !== null ?
      <div className='adminprofile-cont'>
        <div>
          <div>
            <span>Admin Id : </span>
            <span>{userdata._id}</span>
          </div>
          <div>
            <span>Email : </span>
            <span>{userdata.email}</span>
          </div>
          <div>
            <span>Username : </span>
            <span>{userdata.username}</span>
          </div>
          <div>
            <span>Role : </span>
            <span>{userdata.role}</span>
          </div>
        </div>
        <div className="adminprofile-button-cont p-3 shadow-md">
          <button className='btn'>Add Admin</button>
          <button className='btn'>Show Admins</button>
          <button className='btn'><Link to="/admin/fooditem">Food list</Link></button>
        </div>
      </div>
      :
      <Loadingscreen />
  )
}

export default Adminprofile