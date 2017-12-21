
const totalIncome = 2600.0;

const reducer = (state: number = 0, action): number => {
    switch (action.type) {
        // расчитываем текущий баланс (при старте приложения)
        case 'CALCULATE_BALANCE':
            let balance = totalIncome;
            action.expenses.forEach(expense => {
                balance -= expense.sum;
            });

            return balance;

        case 'ADD_EXPENSE':
            // TODO отнимать только если расход в текущем месяце
            return (state - action.sum);

        default:
            return state;
    }
};

export default reducer;
