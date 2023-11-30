import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Cartitem = (props) => {

    const navigator = useNavigate()
    const dispatch = useDispatch()

    function ordernowHandel(event){
        // set the checkout reducer
        console.log(props.item)
        dispatch({type : "SET_CHECKOUT_ITEM", data : props.item})
        navigator("/checkout")
    }
    
    function addOrderListHandel(event){
        dispatch({type : "ADD_CART_ORDER_LIST", data : props.item})
    }

    return (
        <div className='cart__item-cont'>
            <div className='cart__item-lable-cont flex justify-between shadow-md'>
                <p>
                    {
                        props.item.itemname.length > 10
                            ?
                            props.item.itemname.slice(0, 10) + "..."
                            :
                            props.item.itemname
                    }
                </p>
                <button className='px-3' onClick={(event) => {
                    var id = event.currentTarget.dataset.cartitemid
                    var ele = document.querySelector(`#${id}`)
                    if (ele.dataset.isvisible === "false") {
                        ele.classList.remove("hidden")
                        ele.classList.add("showcontani")
                        ele.dataset.isvisible = 'true'
                        setTimeout(() => {
                            ele.classList.remove("showcontani")
                            ele.classList.add('showcont')
                        }, 485);
                    }
                    else {
                        ele.classList.add("hidecontani")
                        ele.dataset.isvisible = 'false'
                        setTimeout(() => {
                            console.log("hide animation completed")
                            ele.classList.remove('showcont')
                            ele.classList.remove("hidecontani")
                            ele.classList.add('hidden')
                        }, 485)
                    }
                }} data-cartitemid={props.cartitemid}>
                    <svg width={20} height={20}>
                        <path d="M0 5 L10 15 L20 5" />
                    </svg>
                </button>
            </div>
            <div className={`cart__item-desc-cont overflow-hidden flex flex-col justify-between hidden shadow-md`} id={props.cartitemid} data-isvisible='false'>
                <div className='cart__item-desc m-3'>
                    <p>
                        <span>
                            Name :
                        </span>
                        <span>
                            {props.item.itemname}
                        </span>
                    </p>
                    <p>
                        <span>
                            Price :
                        </span>
                        <span>
                            {props.item.itemprice}
                        </span>
                    </p>
                    <p>
                        <span>
                            Quantity :
                        </span>
                        <span>
                            {props.item.itemquantity}
                        </span>
                    </p>
                </div>
                <div className='cart__item-footer-cont mx-3 mb-3'>
                    <div className='cart__item-footer-button-cont'>
                        <button className='btn' onClick={addOrderListHandel}>Add to Order List</button>
                        <button className='btn' onClick={ordernowHandel}>Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartitem