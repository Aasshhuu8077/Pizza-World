export function searchDataReducer(state = null, action) {
    switch (action.type) {
        case "SET_SEARCH-DATA":
            return action.data
        case "UNSET_SERACH-DATA":
            return []
        default:
            return state
    }
}

export function checkoutReducer(state = [], action) {
    switch (action.type) {
        case "SET_CHECKOUT_ITEM":
            return [action.data]
        case "ADD_CHECKOUT_ITEM":
            var consist = false
            state.filter((element) => {
                if (element._id === action.data._id) {
                    consist = true
                }
            })
            if (consist) {
                return state
            }
            else {
                return [...state, action.data]
            }
        case "UNSET_CHECKOUT_ITEM":
            return []
        case "UPDATE_CHECKOUT_QUANTITY":
            var newcheckoutitems = [...state]
            newcheckoutitems.filter((element) => {
                if (element._id === action._id) {
                    element.itemquantity = action.quantity
                    return element
                }
                else {
                    return element
                }
            })
            return newcheckoutitems
        default:
            return state
    }
}