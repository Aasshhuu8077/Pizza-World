import React from 'react'

const Fooditembox = (props) => {
    return (
        <div className='fooditembox-cont shadow-xl'>
            <div className='fooditembox-heading-cont flex justify-center items-center'>{props.fooditem.name}</div>
            <div className='fooditembox-details m-3'>
                {props.fooditem.additionals.length !== 0 ? <>
                    <p><span>Additionals : </span></p>
                    <div className='overflow-scroll'>
                        {
                            props.fooditem.additionals.map((element, index) => {
                                return (
                                    <p>
                                        <span>{element.name} : </span><span>{element.quantity}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                </>
                    : null}
                <p><span>Quantity : </span><span>{props.fooditem.quantity}</span></p>
                <p><span>Price : </span><span>{props.fooditem.price} &#8377;</span></p>
            </div>
            <div className='fooditembox-button-cont'>
                <button className='btn' onClick={(event) => { props.showFoodupdatemodal(event, props.fooditem) }}>
                    Update Item
                </button>
            </div>
        </div>
    )
}

export default Fooditembox