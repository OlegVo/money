import { IExpense } from '../interfaces';
import { IAddExpenseAction, IDeleteExpenseAction, ISaveEditedExpenseAction } from '../actions/actions';
import { ADD_EXPENSE, DELETE_EXPENSE, SAVE_EDITED_EXPENSE, SET_EXPENSES } from '../actions/types';

type ExpensesState = IExpense[];

function addExpense(action: IAddExpenseAction): ExpensesState {
    return action.expenses;
}

function saveEditedExpense(action: ISaveEditedExpenseAction): ExpensesState {
    return action.expenses;
}

function deleteExpense(action: IDeleteExpenseAction): ExpensesState {
    return action.expenses;
}

const reducer = (state: ExpensesState = [], action): ExpensesState => {
    switch (action.type) {
        case SET_EXPENSES:
            return action.expenses || [];

        case ADD_EXPENSE:
            return addExpense(action);

        case SAVE_EDITED_EXPENSE:
            return saveEditedExpense(action);

        case DELETE_EXPENSE:
            return deleteExpense(action);

        default:
            return state;
    }
};

export default reducer;
