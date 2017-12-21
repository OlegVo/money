import { ICategory, IExpense, IExpenseValues, Page } from '../interfaces';
import {
    ADD_EXPENSE, CALCULATE_BALANCE, EDIT_EXPENSE, POP_PAGE, PUSH_PAGE, SET_CATEGORIES, SET_EXPENSES, SET_PAGE,
    START_EDITING_EXPENSE
} from './types';

export const setPage = (page: Page) => {
    return {
        type: SET_PAGE,
        page,
    };
};

export const pushPage = (page: Page) => {
    return {
        type: PUSH_PAGE,
        page,
    };
};

export const popPage = () => {
    return {
        type: POP_PAGE,
    };
};

export const calculateBalance = (expenses: IExpense[]) => {
    return {
        type: CALCULATE_BALANCE,
        expenses,
    };
};

export const setCategories = (categories: ICategory[]) => {
    return {
        type: SET_CATEGORIES,
        categories,
    };
};

export const setExpenses = (expenses: IExpense[]) => {
    return {
        type: SET_EXPENSES,
        expenses,
    };
};

export const addExpense = (category: ICategory, sum: number, comment: string, date: string) => {
    return {
        type: ADD_EXPENSE,
        category, sum, comment, date,
    };
};

export const startEditingExpense = () => {
    return {
        type: START_EDITING_EXPENSE,
    };
};

export const editExpense = (values: IExpenseValues) => {
    return {
        type: EDIT_EXPENSE,
        values,
    };
};
