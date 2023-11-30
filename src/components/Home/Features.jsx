import React from 'react'
// data
import { featuredata } from '../data.js'
// components
import Featurecard from './Featurecard'

const Features = () => {
    console.log(featuredata)
  return (    <section className='feature__section'>
        <div className='feature__section-cont'>
            <div className='feature__heading-cont flex justify-center'>
                <h1 className='feature__heading text-9xl my-5 font-black'>Our Features</h1>
            </div>
            <div className='feature__cont flex justify-evenly my-7'>
                {
                    featuredata.map((element) => {
                        return <Featurecard heading={element.featurename} img={element.featureimg}/>
                    })
                }
            </div>
            <div></div>
        </div>
    </section>
  )
}

export default Features