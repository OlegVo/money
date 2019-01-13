import { ICategories } from '../interfaces';
import { ADD_CATEGORY, SET_CATEGORIES } from '../actions/types';
import { IAddCategoryAction, ISetCategoriesAction } from '../actions/actions';

const defaultState: ICategories = {
    expenses: [],
};

function setCategories(action: ISetCategoriesAction): ICategories {
    return action.categories;
}

function addCategory(action: IAddCategoryAction): ICategories {
    return action.categories;
}

const reducer = (state: ICategories = defaultState, action): ICategories => {
    switch (action.type) {
        case SET_CATEGORIES:
            return setCategories(action);

        case ADD_CATEGORY:
            return addCategory(action);

        default:
            return state;
    }
};

export default reducer;
