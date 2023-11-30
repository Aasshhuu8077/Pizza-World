import { checkExistanceOrderById } from "../components/data.js"

export function cartDataReducer(state = [], action) {
    switch (action.type) {
        case "SET_CART-DATA":
            var cartdata = JSON.parse(localStorage.getItem('cart'))
            if (cartdata === null) {
                return state
            }
            else {
                return cartdata
            }
        case "ADD_DATA-TO-CART":
            var consist = false
            state.filter((element) => {
                if (element._id === action._id) {
                    consist = true
                }
            })
            if (consist) {
                return state
            }
            else {
                return [...state, action.data]
            }
        case "EMPTY_CART-DATA":
            return []
        case "REMOVE-CART-DATA":
            var newcartstate = []
            newcartstate = state.filter((element) => {
                if (element._id !== action._id) {
                    return element
                }
            })
            return newcartstate
        default:
            return state
    }
}

export function cartorderListReducer(state = [], action) {
    switch (action.type) {
        case "ADD_CART_ORDER_LIST":
            // add data to cart order list
            if (!checkExistanceOrderById(state, action.data._id)) {
                var checkoutlist = localStorage.getItem('checkoutlist')
                if (checkoutlist === null) {
                    localStorage.setItem('checkoutlist', JSON.stringify([action.data]))
                }
                else {
                    checkoutlist = JSON.parse(checkoutlist)
                    checkoutlist.push(action.data)
                    localStorage.setItem('checkoutlist', JSON.stringify(checkoutlist))
                }
                return [...state, action.data]
            }
            else{
                return state
            }
        case "REMOVE_CART_ORDER_LIST":
            // remove data from cart order list
            return state
        case "EMPTY_CART_ORDER_LIST":
            localStorage.setItem('checkoutlist', JSON.stringify([]))
            return []
        default:
            var checkoutlist = localStorage.getItem('checkoutlist')
            if (checkoutlist === null) {
                return state
            }
            else {
                return JSON.parse(checkoutlist)
            }
    }
}
