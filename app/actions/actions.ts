import { ICategory, IExpense, Page } from '../interfaces';

export const changePage = (page: Page) => {
    return {
        type: 'CHANGE_PAGE',
        page,
    };
};

export const calculateBalance = (expenses: IExpense[]) => {
    return {
        type: 'CALCULATE_BALANCE',
        expenses,
    };
};

export const setCategories = (categories: ICategory[]) => {
    console.log('setCategories', categories)

    return {
        type: 'SET_CATEGORIES',
        categories,
    };
};

export const setExpenses = (expenses: IExpense[]) => {
    console.log('setExpenses', expenses)

    return {
        type: 'SET_EXPENSES',
        expenses,
    };
};

export const addExpense = (category: ICategory, sum: number, comment: string, date: string) => {
    return {
        type: 'ADD_EXPENSE',
        category, sum, comment, date,
    };
};
