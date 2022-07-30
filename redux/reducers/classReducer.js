let defaultState = {
    selectedItems: { items : [], className: ''}
}

let classReducer = (state = defaultState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case 'ADD_TO_CART': {
            newState.selectedItems = {
                items : [...newState.selectedItems.items, action.payload]
            };
            console.log(newState);
            return newState
        }
        case 'REMOVE_FROM_CART': {
            const index = newState.items.findIndex(
                (selectedItems) => selectedItems.id === action.id
            );
            newState.selectedItems = {
                items: [
                    ...newState.selectedItems.items.filter(
                        (item) => item.id === action.payload.title
                    )
                ]
            }
        }
        default: 
            return state;
    }
};

export default classReducer;
