import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Orderdetailpage = (props) => {
  const backendurl = useSelector(state => state.backendurlReducer)
  const [orderDetail, setOrderDetails] = useState(null)

  const params = useParams()

  async function fetchOrderDetails() {
    // fetch order details
    let req = new Request(backendurl + `/order/getorderbyid/${params.id}`, {
      credentials: "include",
      method: "GET",
      "headers": {
        "content-type": "application/json"
      }
    })
    let res = await fetch(req).then((response) => {

      return response.json()
    }).then((data) => {
      return data
    }).catch((err) => {
      throw err
    })
    if (res.message === 'Found Successfull') {
      console.log(res.data)
      setOrderDetails(res.data)
    } else {
      console.log(res.message)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div>

    </div>
  )
}

export default Orderdetailpage