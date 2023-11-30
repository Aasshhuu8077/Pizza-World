import React from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Addresscard from "./Addresscard";
// stylesheet
import "../../css/profile.css";
import { useEffect } from "react";

const Addresscont = () => {

  const dispatch = useDispatch()
  const userdata = useSelector(state => state.userDataReducer)
  const addresses = useSelector(state => state.allAddressesReducer)
  const showaddressmodal = useSelector(state => {
    return state.showAddressModelReducer
  })
  const selectedAddress = useSelector(state => state.selectedaddressReducer)
  const backendurl = useSelector((state) => state.backendurlReducer)

  useEffect(() => {
    if(userdata !== null){
      var newuserdata = Object.assign({}, userdata)
      newuserdata.addresses = addresses
      dispatch({type : "setuserdata", data : newuserdata})
    }
  }, [addresses])

  async function deleteaddressHandel(event) {
    var req = new Request(backendurl+"/auth/removeaddress", {
      method : "delete",
      credentials : "include",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({"addresstoremove" : selectedAddress})
    })
    var res = await fetch(req)
    .then((response) => {
      return response.json()
    })
    .then(data => {
      // on successfully deletion of the address remove the address from the address list of the userdata
      if(data.message === "successfull"){
        dispatch({type : "UNSET_ADDRESS_ID"})
        dispatch({type : "REMOVE_ADDRESS", data : JSON.parse(selectedAddress)})
        dispatch({type : "unsetaddress"})
      }
      else{
        alert("user address deleted")
      }
      return data
    })
    .catch(err => {
      console.log(err)
      alert("Error")
    })
  }

  return (
    <div className="profile__address-cont ml-3 overflow-hidden">
      <div className="profile__address-heading-cont py-3 pl-3 text-2xl tracking-wide flex justify-between items-center">
        <h1 className="font-black">Address section</h1>
        <div className="address__button-cont mr-3 flex">
          <button className="address-add-btn btn text-lg" onClick={(event) => {
            if(showaddressmodal){
              dispatch({type : "hideaddressmodal"})
            }
            else{
              dispatch({type : "showaddressmodal"})
            }
          }}> + Add</button>
          <button className="address-del-btn btn text-lg" onClick={deleteaddressHandel}> - Delete</button>
        </div>
      </div>  
      <div className="address__cont flex flex-col overflow-scroll pb-20">
        {addresses.map((element, index) => {
          return <Addresscard address={element} cardid={`cardid-${index}`} checkboxid={`checkboxid-${index}`}/>;
        })}
      </div>
    </div>
  );
};

export default Addresscont;
