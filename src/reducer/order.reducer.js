export function currentOrderReducer(state=[], action){
    switch(action.type){
        case "FILL_ORDERS":
            return action.data
        case "ADD_PLACED_ORDER":
            return [action.data, ...state]
        case "ALTER_ORDER_STATUS":
            // find the order by the if provide in the action 
            // then update the order and create new state
            return null
        case "REMOVE_ORDER":
            // remove on the bases of _id of the order
            var newstate = []
            state.map((element) => {
                if(element._id !== action.data){
                    newstate.push(element)
                }
            })
            return newstate
        default:
            return state
    }
}

export function completedOrderReducer(state=[], action){
    switch(action.type){
        case "SET_COMPLETED-ORDER":
            return action.data
        case "ADD_COMPLETED-ORDER":
            return [...state, action.data]
        case "UNSET_COMPLETED-ORDERS":
            return []
        default:
            return state
    }
}

// for the user
export function placedOrderReducer(state=null, action){
    switch(action.type){
        case "SET_PLACEDORDER":
            return action.data
        case "UNSET_PLACEDORDER":
            return null
        default:
            return state
    }
}

export function userOrderReducer(state=[], action){
    switch(action.type){
        case "SET_USER_ORDER":
            return action.data
        case "UNSET_USER_ORDER":
            return [] 
        default:
            return state
    }
}