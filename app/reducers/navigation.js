
const reducer = (state = {page: 'balance'}, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.page
            };

        default:
            return state;
    }
};

export default reducer;
