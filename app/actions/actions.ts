
export const changePage = (page) => {
    return {
        type: 'CHANGE_PAGE',
        page,
    };
};

export const calculateBalance = ({expenses}) => {
    return {
        type: 'CALCULATE_BALANCE',
        expenses,
    };
};

export const setCategories = (categories) => {
    console.log('setCategories', categories)

    return {
        type: 'SET_CATEGORIES',
        categories,
    };
};

export const setExpenses = (expenses) => {
    console.log('setExpenses', expenses)

    return {
        type: 'SET_EXPENSES',
        expenses,
    };
};

export const addExpense = ({category, sum, comment, date}) => {
    return {
        type: 'ADD_EXPENSE',
        category, sum, comment, date,
    };
};
