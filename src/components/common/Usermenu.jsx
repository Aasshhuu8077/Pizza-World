import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// images
import useravatar from "../../assets/images/useravatar.png"
// stylesheet
import "../../css/common.css"

const Usermenu = () => {
    const [showusermenu, setsowusermenu] = useState(false)
    const [listener, setlistener] = useState(null)
    const backendurl = useSelector(state => state.backendurlReducer)
    const navigator = useNavigate()
    const dispatch = useDispatch()
    function hideusermenu() {
        setsowusermenu((prevstate) => false)
        window.removeEventListener('click', hideusermenu)
        setlistener(null)
    }

    async function logouthandler(event) {
        var url = `${backendurl}/auth/logout`;
        var req = new Request(url, {
            method: "DELETE",
            credentials: "include"
        });
        var res = await fetch(req)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                return "Error Occured";
            });
        if (res.message === "Successfully logged out") {
            dispatch({ type: "unsetuserdata" })
            navigator("/login");
            // setshowpopup(false)
            // setmessage(res.message)
        } else {
            setshowpopup(false)
            setmessage(res.message)
        }
    }

    return (
        <div className='usermenu__cont relative'>
            <img src={useravatar} onClick={((event) => {
                if(listener === null){
                    setsowusermenu((prevstate) => {
                        return !prevstate
                    })
                    setTimeout(() => { setlistener(window.addEventListener('click', hideusermenu)) }, 100)
                }
            })} />
            <ul className={`absolute right-0 ${showusermenu ? "show" : "hide"}`}>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li className='logout__menu' onClick={logouthandler}>Logout</li>
            </ul>
        </div>
    )
}

export default Usermenu