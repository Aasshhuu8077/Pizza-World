import React from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import { BsCheck } from "react-icons/bs";

const Addresscard = (props) => {
  const dispatch = useDispatch();
  const addressid = useSelector(state => state.selectedAddressId)

  return (
    <div className="flex flex-col w-full">
      <div className="address__card-cont flex items-center justify-between p-3 mt-3">
        <div className="selection__boxcont flex justify-center items-center relative">
          <div
            className={`checkbox__overlay w-full h-full flex justify-center items-center ${addressid === props.checkboxid ? "selectedbutton" : "unselectedbutton"}`}
            id={props.checkboxid}
          >
            <button
              data-id={`${JSON.stringify(props.address)}`}
              onClick={(event) => {
                if (event.currentTarget.dataset.check === "unchecked" && addressid === "") {
                  dispatch({
                    type: "selectelement",
                    data: event.currentTarget.dataset.id,
                  });
                  dispatch({
                    type : "SET_ADDRESS_ID",
                    data : event.currentTarget.dataset.checkboxid
                  })
                }
                else if(event.currentTarget.dataset.check === "unchecked" && addressid !== "") {
                  // setting the address selection data
                  dispatch({
                    type : "selectelement",
                    data : event.currentTarget.dataset.id
                  })
                  // setting the id
                  dispatch({
                    type : "SET_ADDRESS_ID",
                    data : event.currentTarget.data.checkboxid
                  })
                } else if(event.currentTarget.dataset.check === "checked") {
                  dispatch({
                    type: "unsetaddress",
                  });
                  dispatch({
                    type : "UNSET_ADDRESS_ID"
                  })
                }
              }}
              data-check={`${addressid === props.checkboxid ? "checked" : "unchecked"}`}
              data-checkboxid={`${props.checkboxid}`}
              className="w-full h-full"
            >
              <BsCheck />
            </button>
          </div>
        </div>
        <div className="address__info-cont font-medium">
          {`${props.address.pincode} 
        ${
          props.address.state.charAt(0).toUpperCase() +
          props.address.state.substring(1, props.address.state.length)
        },
        ${
          props.address.district.charAt(0).toUpperCase() +
          props.address.district.substring(1, props.address.district.length)
        }`}
        </div>
        <div className="arrow-btn-cont flex justify-center items-center">
          <button
            onClick={(event) => {
              var element = document.querySelector(
                `#${event.currentTarget.dataset.cardid}`
              );
              var isexpanded =
                element.dataset.expanded === "true" ? true : false;
              if (isexpanded) {
                element.classList.remove("expand__desc");
                element.dataset.expanded = "false";
              } else {
                element.classList.add("expand__desc");
                element.dataset.expanded = "true";
              }
            }}
            className="w-full h-full flex justify-center items-center"
            data-cardid={props.cardid}
          >
            <svg width={20} height={20}>
              <path d="M0 5 L10 15 L20 5" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="address__card-desc flex flex-col"
        data-expanded="false"
        id={props.cardid}
      >
        <div className="m-3">
          <table className="addresscard__table">
            {
              Object.keys(props.address).map((key, index) => {
                return (
                  <tr className="border-2 border-slate-500">
                    <th className=" border-2 border-slate-500 p-2">{key}</th>
                    <td className="p-3"><input placeholder={props.address[key]} /></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  );
};

export default Addresscard;
