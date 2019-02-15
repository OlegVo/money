import { INavigationState, Page } from '../types';
import { POP_PAGE, PUSH_PAGE, SET_PAGE } from '../actions/types';

const reducer = (state: INavigationState = {pages: [Page.Balance]}, action): INavigationState => {
    console.log('action', action.type, action)
    switch (action.type) {
        case SET_PAGE:
            return {
                pages: [action.page],
            };

        case PUSH_PAGE:
            return {
                pages: [...state.pages, action.page],
            };

        case POP_PAGE:
            return {
                pages: state.pages.slice(0, -1),
            };

        default:
            return state;
    }
};

export default reducer;
