import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// components
import Timelineitem from './Timelineitem'
// data
import { timelineitems } from "../data.js"
import { useEffect } from 'react'

const Placedorder = () => {

    const navigator = useNavigate()
    const placedOrder = useSelector(state => state.placedOrderReducer)

    function scrollhandel(event) {
        event.preventDefault()
        var ele = event.currentTarget
        // ele.scrollWidth - ele.offsetWidth === ele.scrollLeft - ele.clientLeft && 
        if (event.deltaY < 0) {
            ele.scrollBy(-30, 0)
        }
        else if (event.deltaY > 0) {
            ele.scrollBy(30, 0)
        }
    }

    useEffect(() => {
        var ele = document.querySelector(".status__timeline-cont")
        ele.addEventListener('wheel', scrollhandel, {passive : false})
        return () => {
            ele.removeEventListener('wheel', scrollhandel)
        }
    }, [])

    return (
        <div className='placeorder__section'>
            <div className='placeorder__order-cont'>
                <div className='placeorder__heading-cont flex justify-center my-6'>
                    <h1 className='font-bold text-7xl'>Order Placed Successfully!</h1>
                </div>
                <div className='flex placeorder__order-lable justify-between shadow-md'>
                    <div>
                        <p>Order ID :<span className='text-green-600'>{placedOrder._id}</span></p>
                    </div>
                    <div>
                        <p>Date : <span>{placedOrder.dateoforder}/{placedOrder.monthoforder}/{placedOrder.yearoforder}</span></p>
                    </div>
                </div>
                <div className={`placeorder__order-desc shadow-md`}>
                    <div className='m-3'>
                        <div className='placeorder__order-table-cont'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        placedOrder.items.map((element, index) => {
                                            return (
                                                <tr>
                                                    <td>{element.itemname}</td>
                                                    <td>{element.itemprice}</td>
                                                    <td>{element.itemquantity}</td>
                                                    <td>{element.itemprice * element.itemquantity}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='placeorder__order-address-cont m-3'>
                            <p><span className='font-bold'>Address : </span>{placedOrder.address.area} {placedOrder.address.street} {placedOrder.address.pincode} near {placedOrder.address.landmark}, {placedOrder.address.district}({placedOrder.address.state})</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='placedorder__status-cont flex justify-start flex-col'>
                <div className='placeorder__status-heading-cont m-5 flex justify-center'>
                    <h1 className='font-black text-3xl tracking-wider'>Status Of Your Order</h1>
                </div>
                <div className='status__timeline-cont flex overflow-scroll'>
                    {
                        Object.keys(timelineitems).map((element, index) => {
                            return (
                                <Timelineitem img={timelineitems[element].img} itemname={element} activeimg={timelineitems[element].activeimg} />
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div className='placeorder__button-cont'>
                    <button className='btn' onClick={(event) => {
                        navigator("/", {replace : true})
                    }}>Continue Shopping</button>
                </div>
            </div>
        </div>
    )
}

export default Placedorder