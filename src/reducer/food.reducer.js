export function allFoodItemsReducer(state=[], action) {
    switch(action.type){
        case "SET_FOOD-ITEMS":
            return action.data
        case "UNSET_FOOD-ITEMS":
            return []
        case "ADD_FOOD-ITEMS":
            return [...state, ...action.data]
        case "ADD_NEWFOOD-ITEM":
            return [...state, action.data]
        default:
            return state
    }
}