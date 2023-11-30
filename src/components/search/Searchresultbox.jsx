import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Searchresultbox = (props) => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const userdata = useSelector(state => state.userDataReducer)
  const resultview = useSelector(state => state.searchResultViewReducer)

  function compareIteminCart(cartdata, itemid) {
    for (var i = 0; i < Object.keys(cartdata).length; i++) {
      if (cartdata[i]._id === itemid) {
        return false
      }
    }
    return true
  }

  function placeorderHandle(event) {
    if (userdata !== null) {
      dispatch({
        type: "SET_CHECKOUT_ITEM", data: {
          _id: props.element._id,
          itemname: props.element.name,
          itemprice: props.element.price,
          itemquantity: 1
        }
      })
      navigator("/checkout")
    }
    else {
      alert("Your Are not Logged in!")
    }
  }

  function addtoCartHandel(event) {
    var cartdata = localStorage.getItem("cart")
    if (cartdata === null) {
      localStorage.setItem("cart", JSON.stringify([]))
      cartdata = localStorage.getItem("cart")
    }
    cartdata = JSON.parse(cartdata)
    if (compareIteminCart(cartdata, props.element._id)) {
      var newcartitem = {
        _id: props.element._id,
        itemname: props.element.name,
        itemprice: props.element.price,
        itemquantity: 1
      }
      cartdata = [...cartdata, newcartitem]
      localStorage.setItem("cart", JSON.stringify(cartdata))
      dispatch({ type: "ADD_DATA-TO-CART", data: newcartitem })
      alert("Item Added to cart")
    }
    else {
      alert("Item Already exist in the Cart")
    }
  }

  if (resultview === "grid") {
    return (
      <div className='searchresult-gridbox'>

      </div>
    )
  }
  else if (resultview == "list") {
    return (<>
      <div className='searchresult-listbox flex justify-between'>
        <div>
          <h2 className='font-black text-2xl'>{props.element.name}</h2>
          <p className='font-bold text-xl'>&#8377; {props.element.price}</p>
          <p className='font-medium'>{props.element.quantity}</p>
        </div>
        <div className='flex flex-col'>
          <button className='btn' onClick={addtoCartHandel} >Add To Cart</button> {// add the functionality to add to cart using local storage
          }
          <button className='btn' onClick={placeorderHandle}>Place Order</button>
        </div>
      </div>
    </>
    )
  }
}

export default Searchresultbox