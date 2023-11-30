import { combineReducers } from "redux"
// reducers
import {
    userDataReducer,
    loginstatusReducer
} from "./userdata.reducer.js"
import { showloadingScreenReducer } from "./commonreducers.js"
import {
    searchDataReducer,
    checkoutReducer
} from "./search.reducer.js"
import {
    selectedaddressReducer,
    showAddressModelReducer,
    allAddressesReducer,
    selectedAddressId
} from "./address.reducer.js"
import {
    backendurlReducer,
    searchResultViewReducer
} from "./commonreducers.js"
import {
    currentOrderReducer,
    completedOrderReducer,
    placedOrderReducer,
    userOrderReducer
} from "./order.reducer.js"
import {
    allFoodItemsReducer
} from "./food.reducer.js"
import {
    cartDataReducer,
    cartorderListReducer
} from "./cart.reducer.js"

const rootreducer = combineReducers({
    userDataReducer, // setuserdata, unsetuserdata
    loginstatusReducer, // setlogintrue, setloginfalse
    showloadingScreenReducer, // setLoadingscreenfalse, setLoadingScreenTrue
    selectedaddressReducer, // selectelement, unsetaddress
    backendurlReducer, // only for return in the url of the backend
    showAddressModelReducer, // showaddressmodal, hideaddressmodal
    allAddressesReducer, // SET_ADDRESS, UNSET_ADDRESS, ADD_ADDRESS, REMOVE_ADDRESS
    selectedAddressId, // SET_ADDRESS_ID, UNSET_ADDRESS_ID
    searchDataReducer, // SET_SEARCH-DATA, UNSET_SERACH-DATA
    currentOrderReducer, // ADD_PLACED_ORDER, ALTER_ORDER_STATUS, REMOVE_ORDER
    completedOrderReducer, // SET_COMPLETED-ORDER, ADD_COMPLETED-ORDER, UNSET_COMPLETED-ORDERS
    allFoodItemsReducer, // SET_FOOD-ITEMS, UNSET_FOOD-ITEMS, ADD_FOOD-ITEMS,
    searchResultViewReducer, // GRID, LIST
    checkoutReducer, // ADD_CHECKOUT_ITEM, UNSET_CHECKOUT_ITEM, SET_CHECKOUT_ITEM
    placedOrderReducer, // SET_PLACEDORDER, UNSET_PLACEDORDER
    cartDataReducer, // SET_CART-DATA, ADD_DATA-TO-CART, EMPTY_CART-DATA, REMOVE-CART-DATA
    cartorderListReducer, // ADD_CART_ORDER_LIST, REMOVE_CART_ORDER_LIST, 
    userOrderReducer, // SET_USER_ORDER, UNSET_USER_ORDER
})

export default rootreducer;