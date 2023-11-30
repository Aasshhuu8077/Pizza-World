import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Orders = (props) => {
  const navigator = useNavigate()
  const backendurl=useSelector(state=>state.backendurlReducer)
  const [orderdetails,setorderdetails]=useState(null);
  async function addFooditemHandel() {
    var req = new Request(backendurl +`/order/getorderbyid/${props.address}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        // body: JSON.stringify(fooditemdata)
    })
    var res = await fetch(req)
        .then((response => {
            return response.json()
        }))
        .then((data => {
            return data
        }))
        .catch((err) => {
            alert(err.message)
        })
      if(res.message==='Found Successfull'){
        setorderdetails(res.data);
        console.log(orderdetails)
      }
      else{
        console.log(res.message);
      }
}
  useEffect(() => {
    addFooditemHandel();
  }, [])
  return (
    <div className='order-cont flex justify-center items-center shadow-lg	w-full' onClick={(event) => {
      navigator("/orders/details/"+props.address)
    }}>
      {props.address}
    </div>
  )
}

export default Orders