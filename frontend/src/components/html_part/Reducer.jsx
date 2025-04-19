export const reducer = (state, action) => {
    if(action.type === "INCREMENT"){
        const updatedItems = {};
        for(const category in state.item){
            updatedItems[category] = state.item[category].map((curElem) => {
                if(curElem.id === action.payload && curElem.category === action.category){
                    if(curElem.quantity < 10){
                        return {...curElem, quantity: curElem.quantity + 1};
                    }
                }
                return curElem;
            })
        }

        return {...state, item:updatedItems};
    }

    if(action.type === "DECREMENT"){
        const updatedItems = {};
        for(const category in state.item){
            updatedItems[category] = state.item[category].map((curElem) => {
                if(curElem.id === action.payload && curElem.category === action.category){
                    if(curElem.quantity > 1){
                        return {...curElem, quantity: curElem.quantity - 1};
                    }
                }
                return curElem;
            })
        }

        return {...state, item:updatedItems};
    }

    if(action.type === "ADD_TO_CART"){
        const updatedItems = {};
        for(const category in state.item){
            updatedItems[category] = state.item[category].map((curElem) => {
                if(curElem.id === action.payload && curElem.category === action.category){
                    return {...curElem, cartAdded: !curElem.cartAdded};
                }
                return curElem;
            })
        }

        return {...state, item:updatedItems};
    }

    if(action.type === "CLEAR_CART"){
        const clearedItems = {};
        for(const category in state.item){
            clearedItems[category] = state.item[category].map((curElem) => {
                return {
                    ...curElem,
                    quantity: 1,
                    cartAdded: false,
                }
            })
        }

        return {...state, item:clearedItems};
    }
    
    return state;
}

