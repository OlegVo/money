import { getStartAndEndOfMonth } from '../helpers/date';
import { CALCULATE_BALANCE } from '../actions/types';
import { ICalculateBalanceAction } from '../actions/actions';
const moment = require('moment');
import { filterIncomesByDates } from '../helpers/expenses';

function calculateBalance(action: ICalculateBalanceAction): number {
    let balance = 0;

    action.planning.monthPlans.forEach(plan => {
        const { startDate, endDate } = getStartAndEndOfMonth(plan.month);
        const now = moment().endOf('day');

        // если месяц ещё не наступил, не учитываем его в подсчёте баланса
        if (startDate > now) return;

        let incomes = plan.incomes;
        // если это текущий месяц, то не учитываем доходы позже конца текущего дня
        if (now < endDate) {
            incomes = filterIncomesByDates(incomes, startDate, now);
        }
        incomes.forEach(income => {
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
