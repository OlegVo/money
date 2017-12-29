import { ADD_EXPENSE, CALCULATE_BALANCE, SAVE_EDITED_EXPENSE } from '../actions/types';

const totalIncome = 5000.0;

const reducer = (state: number = 0, action): number => {
    switch (action.type) {
        // расчитываем текущий баланс (при старте приложения)
        case CALCULATE_BALANCE:
        case ADD_EXPENSE:
        case SAVE_EDITED_EXPENSE:
            let balance = totalIncome;
            action.expenses.forEach(expense => {
                balance -= expense.sum;
            });

            return balance;

        default:
            return state;
    }
};

export default reducer;
