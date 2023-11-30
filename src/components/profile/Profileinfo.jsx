import React from 'react'
// stylesheet
import "../../css/profile.css"
import { profileInfoTopicmap } from "../../reducer/data.js"

const Profileinfo = (props) => {
  return (
    <div className="profile__info-cont ml-5 mb-5">
      <div className='profile__image-cont'></div>
      <div className='profile__infomation-cont flex flex-col pt-2'>
        {
          Object.keys(props.profileinfo).map((key, index) => {
            return (
              <div key={index} className="grid justify-between py-1">
                <p className='font-black'>
                  {profileInfoTopicmap[key]}
                </p>
                <p className='font-medium'>
                  {props.profileinfo[key]}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Profileinfo