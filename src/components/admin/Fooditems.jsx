import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
import { ImCross } from "react-icons/im"
import { BsPlusLg } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import Fooditembox from './Fooditembox'

const Fooditems = () => {
    const [pagenumber, setPagenumber] = useState(1)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showloading, setShowloading] = useState(false)
    const [showaddAdditionmodal, setShowaddAdditionalModal] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState({})
    // states to handel new food data
    const [itemname, setItemname] = useState(null)
    const [itemquantity, setItemquantity] = useState(null)
    const [quantityError, setQuantityError] = useState("")
    const [itemprice, setItemprice] = useState(null)
    const [priceError, setPriceError] = useState("")
    // state for additional item data
    const [additionalitemname, setAdditionalitemname] = useState('')
    const [additionalitemquantity, setAdditionalitemquantity] = useState('')
    const [additionalitems, setAdditionalitems] = useState([]) // will contain array of objects
    // selectors
    const backendurl = useSelector(state => state.backendurlReducer)
    const allfooditems = useSelector(state => state.allFoodItemsReducer)
    const dispatch = useDispatch()

    async function requestOnScrollHandel(event) {
        if (Math.floor(event.target.scrollTop - event.target.clientTop) === event.target.scrollHeight - event.target.offsetHeight && pagenumber !== 0) {
            await getFooditemsHandel()
        }
    }

    function clearItemFields() {
        setItemname("")
        setItemprice("")
        setItemquantity("")
        setPriceError("")
        setQuantityError("")
        setAdditionalitems([])
    }

    useEffect(() => {
        document.querySelector(".fooditems-list-cont").addEventListener("scroll", requestOnScrollHandel)
        return () => {
            var element = document.querySelector(".fooditems-list-cont")
            if (element !== null) {
                element.removeEventListener("scroll", requestOnScrollHandel)
            }
        }
    }, [pagenumber])

    async function getFooditemsHandel() {
        if (pagenumber !== 0) {
            var req = new Request(`${backendurl}/food/getallfood?pagenumber=${pagenumber}`, {
                credentials: "include"
            })
            var res = await fetch(req)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    return data
                })
            if (res.message === "successfull") {
                if (pagenumber === 1) {
                    dispatch({ type: "SET_FOOD-ITEMS", data: res.data })
                }
                else {
                    dispatch({ type: "ADD_FOOD-ITEMS", data: res.data })
                }
                if (res.data.length < 6) {
                    setPagenumber((prevstate) => {
                        return 0
                    })
                }
                else {
                    setPagenumber((prevstate) => {
                        return prevstate + 1
                    })
                }
            }
            else {
                alert(res.message)
            }
        }
    }

    async function addFooditemHandel() {
        var fooditemdata = {
            name: itemname,
            quantity: itemquantity,
            price: itemprice,
            additionals: additionalitems
        }
        var req = new Request(backendurl + "/food/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fooditemdata)
        })
        var res = await fetch(req)
            .then((response => {
                return response.json()
            }))
            .then((data => {
                return data
            }))
            .catch((err) => {
                alert(err.message)
            })
        if (res.message === "successfull") {
            dispatch({ type: "ADD_NEWFOOD-ITEM", data: res.data })
            clearItemFields()
        }
        else {
            alert(res.message)
        }
    }

    async function updateFooditemHandel() {
        console.log("update request fired 🚀")
    }

    useEffect(() => {
        getFooditemsHandel()
    }, [])

    function showFoodupdatemodal(event, itemtoupdate) {
        setShowUpdateModal(prevstate => {
            return !prevstate
        })
        setItemToUpdate((prevstate) => {
            return itemtoupdate
        })
    }

    function deleteAdditionalItem(event, data) {
        var newaddlist = []
        newaddlist = additionalitems.filter((element, index) => {
            console.log(element, data)
            if (element.name !== data.name && element.quantity !== data.quantity) {
                return element
            }
        })
        setAdditionalitems((prevstate) => {
            return newaddlist
        })
    }

    return (
        <div className='fooditems-cont'>
            <div className='fooditems_control-panel'>
                <div className='flex justify-center py-4 font-black text-2xl'>
                    <h1 className=''>Add Panel</h1>
                </div>
                <div>
                    {/**
                     * add the check on the length of name
                     * add the check on the type of quantity
                     */}
                    <p>
                        <span>Item Name : </span>
                        <input value={itemname} onChange={(event) => {
                            setItemname((prevstate) => {
                                return event.target.value
                            })
                        }} />
                    </p>
                    <p>
                        <span>Quantity : </span>
                        <input value={itemquantity} onChange={(event) => {
                            if (isNaN(Number(event.target.value))) {
                                setQuantityError("*Quantity should a Number")
                            }
                            else {
                                setItemquantity((prevstate) => {
                                    return event.target.value
                                })
                                setQuantityError((prevstate) => "")
                            }
                        }} />
                        <span className='errorspan'>{quantityError}</span>
                    </p>
                    <p>
                        <span>Price : </span>
                        <input value={itemprice} onChange={(event) => {
                            if (isNaN(Number(event.target.value))) {
                                setPriceError("*Price should a Number")
                            }
                            else {
                                setItemprice((prevstate) => {
                                    return event.target.value
                                })
                                setPriceError((prevstate) => "")
                            }
                        }} />
                        <span className='errorspan' >{priceError}</span>
                    </p>
                    <p className='relative'>
                        <span>Additionals : <button className='btn' onClick={(event) => {
                            setShowaddAdditionalModal((prevstate) => true)
                        }}><BsPlusLg /></button></span>
                        <div className={`additionitemmodal absolute ${showaddAdditionmodal ? "show" : "hide"}`}>
                            <p>
                                <span>Name : </span>
                                <input value={additionalitemname} onChange={(event) => {
                                    setAdditionalitemname((prestate) => {
                                        return event.target.value
                                    })
                                }} />
                            </p>
                            <p>
                                <span>Quantity : </span>
                                <input value={additionalitemquantity} onChange={(event) => {
                                    setAdditionalitemquantity((prestate) => {
                                        return event.target.value
                                    })
                                }} />
                            </p>
                            <button className='btn' onClick={(event) => {
                                setAdditionalitems((prevstate) => {
                                    return [...prevstate, {
                                        name: additionalitemname,
                                        quantity: additionalitemquantity
                                    }]
                                })
                                setShowaddAdditionalModal((prevstate) => false)
                                // clear all the inputs
                                setAdditionalitemname((prestate) => {
                                    return ""
                                })
                                setAdditionalitemquantity((prestate) => {
                                    return ""
                                })
                            }}>
                                Add
                            </button>
                        </div>
                        <div className='additionalitemcont'>
                            {
                                additionalitems.map((element, index) => {
                                    return (
                                        <p><span>{element.name} : {element.quantity}</span><span onClick={(event) => {
                                            deleteAdditionalItem(event, element)
                                        }}><AiOutlineDelete /></span></p>
                                    )
                                })
                            }
                        </div>
                    </p>
                </div>
                <div className='fooditems-button-cont flex justify-center items-center'>
                    <button className='btn' onClick={addFooditemHandel}>Add Food item</button>
                </div>
            </div>
            <div className='fooditems-list-cont'>
                {
                    allfooditems.map((element, index) => {
                        return (
                            <Fooditembox
                                showFoodupdatemodal={showFoodupdatemodal}
                                key={index}
                                fooditem={element}
                            />
                        )
                    })
                }
            </div>
            <div className={`foodupdate_modal ${showUpdateModal ? "show" : "hide"}`}>
                <div onClick={(event) => {
                    setShowUpdateModal(prevstate => {
                        return !prevstate
                    })
                }} className="text-white bg-black p-2 m-2 right-0 top-0 fixed">
                    <ImCross />
                </div>
                <div className={`foodupdate_modal-form ${showUpdateModal ? "showmodalcls" : null}`}>
                    <div className='flex justify-center p-3'>Edit item : {itemToUpdate._id}</div>
                    <div></div>
                    <div className=''>
                        <button className='btn' onClick={updateFooditemHandel}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fooditems