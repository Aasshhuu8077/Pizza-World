import React from 'react'
import { Link } from 'react-router-dom'
// component
import Usermenu from "../common/Usermenu"
// stylesheet
import "../../css/admin.css"
import "../../css/common.css"

const Adminnav = () => {
  return (
    <div className='adminnav__cont flex justify-between items-center py-3 px-2'>
        <h1 className='font-black text-2xl ml-9'>Admin Panel</h1>
        <div className='flex'>
          <p><Link to="/admin">Admin panel</Link></p>
          <p><Link to="/admin/fooditem">Food item Panel</Link></p>
        </div>
        <Usermenu />
    </div>
  )
}

export default Adminnav