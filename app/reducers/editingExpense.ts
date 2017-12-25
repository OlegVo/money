import { IExpenseValues } from '../interfaces';
import { ADD_EXPENSE, EDIT_EXPENSE, START_EDITING_EXPENSE } from '../actions/types';
import * as moment from 'moment';
import * as formats from '../constants/formats';

const reducer = (state: IExpenseValues = {}, action): IExpenseValues => {
    switch (action.type) {
        case START_EDITING_EXPENSE:
            return {
                category: undefined,
                sum: undefined,
                comment: '',
                date: moment().format(formats.DATE_FORMAT),
            };

        case EDIT_EXPENSE:
            return {
                ...state,
                ...action.values,
            };

        case ADD_EXPENSE:
            return {};

        default:
            return state;
    }
};

export default reducer;