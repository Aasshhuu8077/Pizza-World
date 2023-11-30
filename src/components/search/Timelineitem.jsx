import React from 'react'

const Timelineitem = (props) => {
    return (
        <div className={`status__timeline-item-cont`}>
            <div>
                <div className={`${props.itemname === "Order Placed" ? "activated__item" : ""}`}>
                    <img src={props.itemname === "Order Placed" ? props.activeimg : props.img} />
                    <div>{props.itemname}</div>
                </div>
                {props.itemname !== "Delivered" ? <div></div> : null}
            </div>
        </div>
    )
}

export default Timelineitem