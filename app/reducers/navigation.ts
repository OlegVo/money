import { INavigationState, Page } from '../interfaces';

const reducer = (state: INavigationState = {page: Page.Balance}, action): INavigationState => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.page,
            };

        default:
            return state;
    }
};

export default reducer;
