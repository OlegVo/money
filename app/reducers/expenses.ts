import { IExpense } from '../interfaces';
import { IAddExpenseAction } from '../actions/actions';

type ExpensesState = IExpense[];

function addExpense(action: IAddExpenseAction): ExpensesState {
    return action.expenses;
}

const reducer = (state: ExpensesState = [], action): ExpensesState => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.expenses || [];

        case 'ADD_EXPENSE':
            return addExpense(action);

        default:
            return state;
    }
};

export default reducer;
