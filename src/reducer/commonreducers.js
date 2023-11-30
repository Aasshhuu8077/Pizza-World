export function showloadingScreenReducer(state=true, action){
    // this reducer will tell wether to show the loading screen or not
    // true to show loading and false to hide loading 
    switch (action.type){
        case "setLoadingscreenfalse":
            return false
        case "setLoadingScreenTrue":
            return true
        default:
            return state
    }
}

export function searchResultViewReducer(state="list", action) {
    switch(action.type){
        case "GRID":
            return "grid"
        case "LIST":
            return "list"
        default:
            return state
    }
}

export function backendurlReducer(state="http://localhost:4000", action){
    return state
}