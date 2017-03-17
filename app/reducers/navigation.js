
const reducer = (state = {page: 'menu'}, action) => {
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
