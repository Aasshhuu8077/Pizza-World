export function allAddressesReducer(state=[], action){
    // help in adding and removing the address from the address list
    switch(action.type){
        case "SET_ADDRESS":
            return action.data
        case "UNSET_ADDRESS":
            return []
        case "ADD_ADDRESS":
            return action.data
        case "REMOVE_ADDRESS":
            var newaddarr = []
            for(var i = 0; i < state.length; i++){
                if(state[i]._id === action.data._id){
                    continue
                }
                else{
                    newaddarr.push(state[i])
                }
            }
            return newaddarr
        default:
            return state
    }
}

export function selectedAddressId(state="", action){
    // this reducer help in keeping the record of the address id for the checkbox 
    switch(action.type){
        case "SET_ADDRESS_ID":
            return action.data
        case "UNSET_ADDRESS_ID":
            return ""
        default:
            return state
    }
}

export function selectedaddressReducer(state="", action){
    // keep the record of the data of the selected address
    switch (action.type){
        case "selectelement":
            return action.data
        case "unsetaddress":
            return ""
        default:
            return state
    }
}

export function showAddressModelReducer(state=false, action){
    switch(action.type) {
        case "showaddressmodal":
            return true
        case "hideaddressmodal":
            return false
        default:
            return state
    }
}