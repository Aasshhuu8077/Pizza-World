import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Orderbox from './Orderbox'

const Completedorders = () => {
  const [date, setDate] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const dispatch = useDispatch()
  const completedorders = useSelector(state => state.completedOrderReducer)
  const backendurl = useSelector(state => state.backendurlReducer)

  useEffect(() => {
    const funct = async () => {
      var req = new Request(`${backendurl}/order/completeorder?date=${date}&year=${year}&month=${month}`, {
        credentials: "include"
      })
      var res = await fetch(req)
        .then(response => {
          return response.json()
        })
        .then(data => {
          return data
        })
        console.log(res)
      if (res.message === "Found Successfully") {
        dispatch({ type: "SET_COMPLETED-ORDER", data: res.data })
      }
      else {
        alert(res.message)
      }
    }
    funct()
  }, [])

  return (
    <div className='current__order-cont'>
      {
        completedorders.map((element, index) => {
          var address = element.address
          return (
            <Orderbox
              key={index}
              orderid={element._id}
              dateoforder={`${element.dateoforder}/${element.monthoforder}/${element.yearoforder}`}
              pincode={address.pincode}
              street={address.street}
              area={address.area}
              address={`${address.district}(${address.state}) near ${address.landmark}`}
              items={element.items}
            />
          )
        })
      }
    </div>
  )
}

export default Completedorders