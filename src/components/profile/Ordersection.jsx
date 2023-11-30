import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
// component
import Orders from "./Orders";
import Popup from "../common/Popup"
// stylesheet
import "../../css/profile.css";

const Ordersection = (props) => {
  const dispatch = useDispatch()
  const navigator = useNavigate();
  const backendurl = useSelector((state) => state.backendurlReducer)
  const [showpopup, setshowpopup] = useState(true)
  const [popupmessage, setmessage] = useState('')

  async function logouthandler(event) {
    var url = `${backendurl}/auth/logout`;
    var req = new Request(url, {
      method: "DELETE",
      credentials : "include"
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
      dispatch({type : "unsetuserdata"})
      navigator("/login");
      // setshowpopup(false)
      // setmessage(res.message)
    } else {
      setshowpopup(false)
      setmessage(res.message)
    }
  }

  return (
    <>
      <div className="profile__orderlist-cont grid">
        <div className="profile__button-cont flex justify-center items-center">
          <div className="profile__basic-button-cont flex justify-center items-center w-full h-full shadow-xl">
            <button className="commit-button btn">Save Changes</button>
            <button className="orders-button btn"><Link to="/orders">Orders</Link></button>
            <button className="logout-button btn" onClick={logouthandler}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center font-black text-2xl tracking-wide text-gray-500">
            Your Orders
          </div>
          <div className="orderlist-cont list-none flex flex-col items-center text-gray-400">
            {props.orderlist.map((element, index) => {
              return <Orders address={element} />;
            })}
          </div>
        </div>
      </div>
      <Popup ishidden={showpopup} message={popupmessage}/>
    </>
  );
};

export default Ordersection;
