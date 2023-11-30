import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"
// stylesheet
import "../../css/orderpage.css"

const Orderpage = () => {
  const backendurl = useSelector(state => state.backendurlReducer)
  const address = useSelector(state => state.selectedaddressReducer)
  const userorders = useSelector(state => state.userOrderReducer)

  // useEffect(() => {
  //   const socket = io(backendurl, {
  //     withCredentials: true
  //   })
  //   // socket.on("connect", (data) => {
  //   //   alert("connected")
  //   // })
  //   socket.on("statusupdate", (data) => {
  //     alert(data.status)
  //   })
  // }, [])

  async function placeOrderHandel(event) {
    const order = {
      items: [
        {
          itemname: "Burgur",
          itemprice: 20,
          itemquantity: 2
        },
        {
          itemname: "Pizza",
          itemprice: 20,
          itemquantity: 2
        },
        {
          itemname: "Cheez pizza",
          itemprice: 20,
          itemquantity: 2
        }
      ],
      address: JSON.parse(address)
    }
    var req = new Request(backendurl + "/order/placeorder", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
    var res = await fetch(req)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function getOrderDetails(event){
    console.log("jhadsfjaskldfjaskldjfklsadjfklsadf")
    var req = new Request(`${backendurl}/order/getorderbyid/${event.currentTarget.dataset.id}`, {
      credentials : "include"
    })
    var res = await fetch(req)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
    console.log(res)
  }

  return (
    <div className='orderpage__section'>
      <div className='orderpage__cont'>
        <div className='orderpage__heading-cont'>
          <h1 className='font-bold text-5xl'>Your Orders...</h1>
        </div>
        <div className='orderpage__userorder-cont'>
          {
            userorders.map((element, index) => {
              return (
                <div className='order__userorder-itemcont shadow-md'>
                  <div className='order__userorder-itemlable' data-id={element} onClick={getOrderDetails}>
                    <p>{element}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Orderpage