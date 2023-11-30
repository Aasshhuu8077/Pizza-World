import React from 'react'

const Popup = (props) => {
  return (
    <div className={`${props.ishidden ? "hidden" : "block"} absolute top-0 font-black text-8xl`}>{props.message}</div>
  )
}

export default Popup