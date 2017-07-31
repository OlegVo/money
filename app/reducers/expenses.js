import { AsyncStorage } from 'react-native';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.expenses || [];

        case 'ADD_EXPENSE':
            const { category, sum, comment, date } = action;

            const expense = { category: category.id, sum, comment, date };

            const expenses = [...state, expense];

            // TODO отсортировать по дате (вставить в правильное место)

            AsyncStorage.setItem('expenses', JSON.stringify(expenses));

            return expenses;

        default:
            return state;
    }
};

export default reducer;
