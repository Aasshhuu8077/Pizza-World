import React from 'react'
// image
import sideimg from "../../assets/images/cafesectionimg.png"
// stylesheet
import "../../css/cafesection.css"
const Cafesection = () => {
  return (
    <section className='cafe__section'>
        <div className='cafesection__cont grid w-full h-full grid-cols-2 relative'>
                <div className='cafesection__overlay w-full h-full absolute'></div>
            <div className='cafesection__img-cont flex relative'>
                <img src={sideimg}/>
            </div>
            <div className='cafesection__data-cont relative'>
                <h1 className='text-6xl absolute'>Have some<br/> Delicious Pizza</h1>
                <div className=''></div>
                <div className=''></div>
                <div className=''></div>
            </div>
        </div>
    </section>
  )
}

export default Cafesection