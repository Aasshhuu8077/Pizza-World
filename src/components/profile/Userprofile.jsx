import React from 'react'
// stylesheet
import "../../css/profile.css"

const Userprofile = (props) => {
  return (
    <div className="profile__data-cont flex-col">
        {props.children}
    </div>
  )
}

export default Userprofile