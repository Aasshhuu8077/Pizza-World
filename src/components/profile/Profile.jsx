import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
// components
import Ordersection from "./Ordersection";
import Profileinfo from "./Profileinfo";
import Addresscont from "./Addresscont";
import Userprofile from "./Userprofile";
import { ImCross } from "react-icons/im"
// hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// stylesheet
import "../../css/profile.css";
import "../../css/common.css"

const Profile = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch()
  const backendurl = useSelector(state => state.backendurlReducer)
  const showaddressmodal = useSelector(state => state.showAddressModelReducer)
  const userdata = useSelector((states) => {
    return states.userDataReducer;
  });
  const addresses = useSelector(state => state.allAddressesReducer)
  // address modal states
  const [landmark, setLandmark] = useState('')
  const [street, setStreet] = useState('')
  const [area, setArea] = useState('')
  const [pincode, setPincode] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  // message state
  const [alertMessage, setAlertmessage] = useState('')

  useEffect(() => {
    if (userdata === null) {
      navigator("/login")
    }
  }, [])

  function getAddressData(){
    return JSON.stringify({
      landmark,
      street,
      area,
      pincode,
      district,
      state
    })
  }

  function clearStates(){
    setLandmark('')
    setArea('')
    setPincode('')
    setDistrict('')
    setState('')
    setStreet('')
  }

  useEffect(() => {
    if(userdata !== null){
    var newuserdata = Object.assign({}, userdata)
    newuserdata.addresses = addresses
    dispatch({type : "setuserdata", data : newuserdata})}
  }, [addresses])

  async function addAddressHandel(event) {
    var req = new Request(`${backendurl}/auth/addaddress`, {
      method : "POST",
      credentials : "include",
      headers : {
        "Content-Type" : "application/json"
      },
      body : getAddressData()
    })
    var res = await fetch(req).then((response) => {
      return response.json()
    })
    .then((data) => {
      if(data.message === "address saved successfully"){
        setAlertmessage("*" + data.message)
        dispatch({type : "ADD_ADDRESS", data : data.data})
        clearStates()
      }
      else{
        setAlertmessage("*unable to Add the address")
        return data
      }
    })
    .catch((err) => {
      console.log(err)
      alert('asdfghj')
    })
  }

  if (userdata !== null) {
    return (
      <>
        <Navbar />
        <section className="profile__section h-full">
          <div className="profile__section-cont">
            <Userprofile>
              <Profileinfo
                profileinfo={{
                  _id: userdata._id,
                  username: userdata.username,
                  email: userdata.email,
                  role: userdata.role,
                  createdat: userdata.createdAt,
                  updatedat: userdata.updatedAt,
                }}
              />
              <Addresscont />
            </Userprofile>
            <Ordersection orderlist={userdata.orders} />
          </div>
          <div className={`profile-address-add-modal fixed top-0 w-full flex ${showaddressmodal ? "showmodal" : "hidemodal"} h-screen justify-center items-center`}>
            <div onClick={(event) => {
              dispatch({type : "hideaddressmodal"})
            }} className="text-white bg-black p-2 position fixed">
              <ImCross />
            </div>
            <div className="profile-address-add-form p-5 rounded-2xl">
              <h1 className="font-bold text-3xl flex justify-center"><span>Add the Address</span></h1>
              <div className="flex flex-col items-center w-full">
                <p className="text-red-600">{alertMessage}</p>
                <div className="grid grid-cols-1 mt-5 ">
                  <p className="grid mt-2 items-center"><span>Landmark</span><input className="inputfield p-2 rounded-md" value={landmark} onChange={(event) => {
                    setLandmark((prevstate) => event.target.value)
                  }}/></p>
                  <p className="grid mt-2 items-center"><span>Area</span><input className="inputfield p-2 rounded-md" value={area} onChange={(event) => {
                    setArea((prevstate) => event.target.value)
                  }} /></p>
                  <p className="grid mt-2 items-center"><span>Street</span><input className="inputfield p-2 rounded-md" value={street} onChange={(event) => {
                    setStreet((prevstate) => event.target.value)
                  }} /></p>
                  <p className="grid mt-2 items-center"><span>Pincode</span><input className="inputfield p-2 rounded-md" value={pincode} onChange={(event) => {
                    setPincode((prevstate) => event.target.value)
                  }} /></p>
                  <p className="grid mt-2 items-center"><span>District</span><input className="inputfield p-2 rounded-md" value={district} onChange={(event) => {
                    setDistrict((prevstate) => event.target.value)
                  }} /></p>
                  <p className="grid mt-2 items-center"><span>State</span><input className="inputfield p-2 rounded-md" value={state} onChange={(event) => {
                    setState((prevstate) => event.target.value)
                  }} /></p>
                </div>
                <button className="address-add-btn btn mt-3" onClick={addAddressHandel}>Add Address</button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  else {
    return <>{null}</>
  }
};

export default Profile;
