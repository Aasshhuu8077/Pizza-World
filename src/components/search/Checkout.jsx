import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// components
import Addresscont from '../profile/Addresscont'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

const Checkout = () => {

    const navigator = useNavigate()
    const dispatch = useDispatch()
    const backendurl = useSelector(state => state.backendurlReducer)
    const checkoutItems = useSelector(state => state.checkoutReducer)
    const selectedaddress = useSelector(state => state.selectedaddressReducer)
    const [parsedselectedaddress, setParseselectedAddress] = useState(null)

    useEffect(() => {
        if (Object.keys(checkoutItems).length === 0) {
            navigator("/food/cart")
        }
    }, [])

    useEffect(() => {
        setParseselectedAddress((prevstate) => {
            if (selectedaddress === "") {
                return null
            }
            else {
                return JSON.parse(selectedaddress)
            }
        })
    }, [selectedaddress])

    async function placeorderHandle(event) {
        const order = {
            items: checkoutItems,
            address: parsedselectedaddress
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
        if (res.message === "Order Placed Successfully") {
            dispatch({ type: "SET_PLACEDORDER", data: res.data })
            dispatch({type : "UNSET_CHECKOUT_ITEM"})
            navigator("/checkout/placedorder", {replace : true})
        }
        else{
            alert("Unable to place the order due to some error")
        }
    }

    return (
        <>
            <div className='checkout_table-container shadow-md'>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkoutItems.map((element, index) => {
                                return (<tr key={index}>
                                    <td>{element.itemname}</td>
                                    <td>{element.itemprice}</td>
                                    <td className='flex justify-between items-center'>
                                        <button onClick={(event) => {
                                            // subtractor of the quantity
                                            if (checkoutItems[index].itemquantity > 1) {
                                                dispatch({ type: "UPDATE_CHECKOUT_QUANTITY", _id: checkoutItems[index]._id, quantity: checkoutItems[index].itemquantity - 1 })
                                            }
                                        }}>
                                            <AiOutlineMinus />
                                        </button>
                                        <input value={checkoutItems[index].itemquantity} onChange={(event) => {
                                            // input box of quantity
                                            if (typeof (Number(event.target.value)) === "number") {
                                                if (Number(event.target.value) >= 1) {
                                                    dispatch({ type: "UPDATE_CHECKOUT_QUANTITY", _id: checkoutItems[index]._id, quantity: Number(event.target.value) })
                                                }
                                            }
                                            if (event.target.value === "") {
                                                dispatch({ type: "UPDATE_CHECKOUT_QUANTITY", _id: checkoutItems[index]._id, quantity: 1 })
                                            }
                                        }} />
                                        <button onClick={(event) => {
                                            // adder of quantity
                                            dispatch({ type: "UPDATE_CHECKOUT_QUANTITY", _id: checkoutItems[index]._id, quantity: checkoutItems[index].itemquantity + 1 })
                                        }}>
                                            <AiOutlinePlus />
                                        </button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <Addresscont />
            </div>
            <div className='checkout__page-btn-cont'>
                {parsedselectedaddress !== null ? <div>
                    {parsedselectedaddress.area} {parsedselectedaddress.street} {parsedselectedaddress.pincode} near {parsedselectedaddress.landmark}, {parsedselectedaddress.district}({parsedselectedaddress.state})
                </div> : <div>No Address Selected</div>}
                <button className='btn' onClick={placeorderHandle}>Place Order</button>
            </div>
        </>
    )
}

export default Checkout