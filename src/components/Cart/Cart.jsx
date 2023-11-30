import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// component
import Cartitem from './Cartitem'
// stylesheet
import "../../css/cart.css"
// images
import empty from "../../assets/images/empty.png"

const Cart = () => {

  const cartdata = useSelector(state => state.cartDataReducer)
  const userdata = useSelector(state => state.userDataReducer)
  const cartorderlist = useSelector(state => state.cartorderListReducer)
  const [totalprice, setTotalPrice] = useState(0)
  const dispatch = useDispatch()
  const navigator = useNavigate()

  useEffect(() => {
    var pricetotal = 0
    cartdata.map((element) => {
      pricetotal += element.itemprice
    })
    setTotalPrice((prevstate) => {
      return pricetotal
    })
  }, [cartdata])

  useEffect(() => {
    if (userdata === null) {
      navigator("/login", { replace: true })
    }
  }, [])

  useEffect(() => {
    if (cartdata.length === 0) {
      dispatch({ type: "SET_CART-DATA" })
    }
  }, [])

  function placeOrderListHandel(event){
    cartorderlist.map((element) => {
      dispatch({type : "ADD_CHECKOUT_ITEM", data : element})
    })
    dispatch({type : "EMPTY_CART_ORDER_LIST"})
    navigator("/checkout")
  }

  return (
    <div className='cart__cont'>
      <div className='cart__heading-cont'>
        <h1 className='font-bold'>Your Cart...</h1>
      </div>
      <div className='cart__data-main-cont'>
        <div className='cart__data-cont overflow-scroll'>
          {
            cartdata.length !== 0
              ?
              <div className='cart__data-itemcont m-3'>
                {
                  cartdata.map((element, index) => {
                    return (
                      <Cartitem item={element} cartitemid={`cartitem-${index}`} />
                    )
                  })
                }
              </div>
              :
              <div className='cart__data-itemcont-emptyimgcont'>
                <img src={empty} />
                <p className='font-bold text-3xl mt-3'>Cart Is Empty</p>
              </div>
          }
        </div>
        {
          cartorderlist.length !== 0
            ?
            <div className='cart__data-itemgroup'>
              <div className='cart__data-itemgroup-itemcont'>
                {
                  cartorderlist.map((element, index) => {
                    return (
                      <div>
                        <p>{element.itemname}</p>
                        <p>{element.itemprice}</p>
                      </div>
                    )
                  })
                }
              </div>
              <div className='cart__data-itemgroup-buttoncont'>
                <button className='btn' onClick={placeOrderListHandel}>Place Order</button>
              </div>
            </div>
            :
            null
        }
      </div>
      <div className='cart__data-footer mt-7 flex items-end flex-col'>
        <div className='cart__data-footer-price my-3'>
          <p className='font-bold'>Order All in Just : <span className='font-normal pl-2 pr-1'>{totalprice}</span>&#8377; </p>
        </div>
        <div className='cart__data-footer-button-cont'>
          <button className='btn'>
            Order All
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart