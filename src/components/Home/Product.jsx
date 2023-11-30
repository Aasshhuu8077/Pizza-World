import React from 'react'
import { productdata } from '../data.js'

const Product = () => {
  return (
    <section className='product__section'>
        <div className='product__section-cont'>
            {
                productdata.map((element) => {
                    
                })
            }
        </div>
    </section>
  )
}

export default Product