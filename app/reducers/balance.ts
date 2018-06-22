import { CALCULATE_BALANCE } from '../actions/types';
import { ICalculateBalanceAction } from '../actions/actions';

function calculateBalance(action: ICalculateBalanceAction): number {
    let balance = 0;

    action.planning.monthPlans.forEach(plan => {
        plan.incomes.forEach(income => {
            if (income.sum) balance += income.sum;
        });
    });

    action.expenses.forEach(expense => {
        balance -= expense.sum;
    });

    return balance;
}

const reducer = (state: number = 0, action): number => {
    switch (action.type) {
        // расчитываем текущий баланс (при старте приложения)
        case CALCULATE_BALANCE:
            return calculateBalance(action);

        default:
            return state;
    }
};

export default reducer;
