import React from 'react'

const Featurecard = (props) => {
  return (
    <div className='featurecard__cont flex flex-col relative'>
        <div className='featurecard__image-cont h-full'>
            <img className='featurecard__img w-full h-full' src={props.img}/>
        </div>
        <div className='featurecard__data-cont flex flex-col absolute items-center bottom-0'>
            <h3 className='py-2 font-black text-xl'>{props.heading}</h3>
        </div>
    </div>
  )
}

export default Featurecard