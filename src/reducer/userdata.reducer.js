export function userDataReducer(state = null, action) {
    switch (action.type) {
        case "setuserdata":
            return action.data
        case "unsetuserdata":
            return null
        default:
            return state;
    }
}

export function loginstatusReducer(state = false, action) {
    switch (action.type) {
        case "setlogintrue":
            return true
        case "setloginfalse":
            return false
        default:
            return state;
    }
}