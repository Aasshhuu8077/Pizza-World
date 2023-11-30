import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
// components
import Orderbox from "./Orderbox"

function Currentorders(props) {
    const backendurl = useSelector(state => state.backendurlReducer)
    const currentOrderList = useSelector(state => state.currentOrderReducer)
    const [adminsocket, setAdminSocket] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        const socket = io(backendurl, {
            withCredentials: true
        });
        setAdminSocket(socket)
        socket.on('connect', (data) => {
            console.log("connect")
        })
        socket.on("orderplaced", (data) => {
            dispatch({ type: "ADD_PLACED_ORDER", data: data })
        })
        return () => {
            socket.off("connect");
            socket.off('orderplaced')
        };
    }, []);

    useEffect(() => {
        var funct = async () => {
            var req = new Request(backendurl + "/order/remainorder", {
                credentials: "include"
            })
            var res = await fetch(req)
                .then((response) => {
                    return response.json()
                })
                .then(data => {
                    return data
                })
            dispatch({ type: "FILL_ORDERS", data: res })
        }
        funct()
    }, [])

    return (
        <div className="current__order-cont">
            {currentOrderList.map((element, index) => {
                var address = element.address
                return (<Orderbox
                    selectedvalue={element.status}
                    key={index}
                    orderid={element._id}
                    dateoforder={`${element.dateoforder}/${element.monthoforder}/${element.yearoforder}`}
                    pincode={address.pincode}
                    street={address.street}
                    area={address.area}
                    address={`${address.district}(${address.state}) near ${address.landmark}`}
                    items={element.items}
                />)
            })}
        </div>
    )
}

export default Currentorders