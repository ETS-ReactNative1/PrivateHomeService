import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_OPTION, SUB_OPTION, ADD_ON_ADD, FETCH_DATA } from "../actions/actionTypes";

export const initialState = {
    addedItems: [],
    total: 0
}

export default addToCartReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case FETCH_DATA:{
            // alert(JSON.stringify(action.payload.items))
            return {...state, items: action.payload.items }
        }
        case ADD_TO_CART: {
            
            let addedItem = state.items.find(item => item.id === action.item.id )
            let existed_item = state.addedItems.find(item => action.item.id === item.id)
            if (existed_item) {
                addedItem.quantity += 1;
                addedItem.whiskyGlass = 1;
                addedItem.wineGlass = 1;
                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            }
            else {
                addedItem.quantity = 1;
                addedItem.whiskyGlass = 1;
                addedItem.wineGlass = 1;
                let newTotal = state.total + addedItem.price

                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal
                }

            }
        }
        case REMOVE_ITEM: {
            let itemToRemove = state.addedItems.find(item => action.id === item.id)
            let new_items = state.addedItems.filter(item => action.id !== item.id)

            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
            console.log(itemToRemove)
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        case ADD_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id)
            addedItem.quantity += 1
            let newTotal = state.total + addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
        case SUB_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id)
            if (addedItem.quantity === 1) {
                addedItem.quantity -= 1
                let new_items = state.addedItems.filter(item => item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    total: newTotal
                }
            }
        }

        case ADD_OPTION: {
            let addedItem;
            for (let i = 0; i < state.items.length; i++) {
                addedItem = state.items[i].options.find(item => item.id === action.id)
            }

            addedItem.OptionQuantity += 1
            let newTotal = state.total + addedItem.OptionPrice
            return {
                ...state,
                total: newTotal,
            }
        }
        case SUB_OPTION: {
            let addedItem;
            for (let i = 0; i < state.items.length; i++) {
                addedItem = state.items[i].options.find(item => item.id !== action.id)
            }
            if (addedItem.OptionQuantity ===0) {
                // addedItem.OptionQuantity -= 1
                // let new_items = state.addedItems.filter(item => item.id !== action.id)
                // let newTotal = state.total - addedItem.OptionPrice
                return {
                    ...state,
                    addedItem,
                    total,
                }
            }
            else {
                addedItem.OptionQuantity -= 1
                let newTotal = state.total - addedItem.OptionPrice
                alert(addedItem.OptionQuantity)
                return {
                    ...state,
                    total: newTotal,
                }
            }

        }
        case ADD_ON_ADD: {
            let index = -1;
             state.addedItems.forEach((item, i) => {
                 if(item.id === action.item.id) {
                     index = i
                 }
             });
             const arr = state.addedItems.slice()
             arr[index][action.option] = arr[index][action.option] + 1
             return {
                 ...state,
                 addedItems: arr
             }
        }
        default: return state
    }
}