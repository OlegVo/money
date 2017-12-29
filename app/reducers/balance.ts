import { ADD_EXPENSE, CALCULATE_BALANCE } from '../actions/types';
import { IAddExpenseAction } from '../actions/actions';

const totalIncome = 5000.0;

function addExpense(action: IAddExpenseAction, state: number): number {
    // TODO отнимать только если расход в текущем месяце
    return (state - action.newExpense.sum);
}

const reducer = (state: number = 0, action): number => {
    switch (action.type) {
        // расчитываем текущий баланс (при старте приложения)
        case CALCULATE_BALANCE:
            let balance = totalIncome;
            action.expenses.forEach(expense => {
                balance -= expense.sum;
            });

            return balance;

        case ADD_EXPENSE:
            return addExpense(action, state);

        default:
            return state;
    }
};

export default reducer;
