import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
// stylesheet
import "../../css/admin.css"
import { Modal, Box } from '@mui/material'

const Orderbox = (props) => {

    const backendurl = useSelector(state => state.backendurlReducer)

    const [adminsocket, setAdminSocket] = useState(null)
    const [deliveryBoyList, setDeliveryBoyList] = useState(null)
    const [showDeliveryBoyList, setShowDeliveryBoyList] = useState(false)

    const dispatch = useDispatch()

    async function statusupdateHandel(event) {
        const statusupdatedata = {
            status: event.target.value,
            order_id: event.target.dataset.orderid
        }
        var req = new Request(backendurl + "/order/updatestatus", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(statusupdatedata)
        })
        var res = await fetch(req)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return data
            })
            .catch(err => {
                console.log(err)
            })
        if (res.message === "status updated successfully" && res.data.status === "delivered") {
            dispatch({ type: "ADD_COMPLETED-ORDER", data: res.data })
            dispatch({ type: "REMOVE_ORDER", data: res.data._id })
        }
        else {
            event.target.value = res.data.status
        }
    }

    async function fetchDeliveryBoyList() {
        try {
            let req = new Request(backendurl + "/deliveryboy/availablelist", {
                credentials: "include",
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            let res = await fetch(req).then((response) => {
                return response.json()
            }).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            })
            if (res.msg = "successfull") {
                setDeliveryBoyList(res.data)
            }
            else {
                alert("Unable to fetch delivery boys list")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let socket = io(backendurl, {
            withCredentials: true
        })
        setAdminSocket(socket)

        socket.on("connect", () => {
            console.log("connected to backend")
        })

        socket.on("disconnect", () => {
            console.log("disconnected from backend")
        })

        socket.on("orderDelivered-deliveryboy", (data) => {
            console.log("order delivered by delivery boy")
        })

        // return () => {
        //     socket.disconnect()
        // }

    }, [])

    return (
        <div className='adminorderbox__cont m-3 shadow-md overflow-scroll'>
            <div className='flex justify-between p-3'>
                <select className='border' value={props.selectedvalue} onChange={statusupdateHandel} data-orderid={props.orderid}>
                    <option value={"placed"}>Placed</option>
                    <option value={"confirming"}>Confirm</option>
                    <option value={"preparing"}>Preparing</option>
                    <option value={"ready"}>Ready</option>
                    <option value={"outfordelivery"}>Out For Delivery</option>
                    <option value={"delivered"}>Delivered</option>
                    <option value={"cancelled"}>Cancelled</option>
                </select>
                <button className='bg-white px-2 py-1 rounded-md'
                    // click on the button to open a list of delivery boys
                    onClick={() => {
                        setShowDeliveryBoyList(true)
                        fetchDeliveryBoyList()
                    }}
                >Set Delivery Boy</button>
                <div>Date:- {props.dateoforder}</div>
            </div>
            <div className='p-3'>{props.area} {props.street} {props.pincode}, {props.address}</div>
            <table className='m-3'>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map((element, index) => {
                            return (
                                <tr key={index}>
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
            <Modal
                open={showDeliveryBoyList}
                onClose={() => { setShowDeliveryBoyList(false) }}
                className='flex justify-center items-center'
            >
                <Box className="bg-white max-w-[50%] max-h-[50%] rounded-md">
                    {
                        deliveryBoyList !== null ?

                            deliveryBoyList.length === 0 ?
                                <div className='bg-white'>No Delivery Boy available</div> :
                                deliveryBoyList.map((element, index) => {
                                    return (
                                        <div key={index} onClick={() => {
                                            adminsocket.emit("set-deliveryboy-order", { props: props, deliveryboy: element._id })
                                            setShowDeliveryBoyList(false)
                                        }}>
                                            <div>{element.name}</div>
                                            <div>{element.currentLocation}</div>
                                            <div>{element.phone}</div>
                                        </div>
                                    )
                                }) :
                            <div>Loading...</div>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default Orderbox