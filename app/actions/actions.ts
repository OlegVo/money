import { ICategory, IExpense, IExpenseData, IExpenseValues, Page } from '../interfaces';
import {
    ADD_EXPENSE, CALCULATE_BALANCE, EDIT_EXPENSE, POP_PAGE, PUSH_PAGE, SAVE_EDITED_EXPENSE, SAVE_EXPENSES,
    SET_CATEGORIES,
    SET_EXPENSES, SET_PAGE,
    START_EDITING_EXPENSE
} from './types';
import { AsyncAction } from './index';
import { AsyncStorage } from 'react-native';

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

interface ISetExpensesAction {
    expenses: IExpense[];
    type: string;
}

export const setExpenses = (expensesData: IExpenseData[], categories: ICategory[]): ISetExpensesAction => {
    const expenses = expensesData.map(e => {
        const category = categories.find(c => c.id === e.categoryId);
        if (!category) throw new Error(`No category ${e.categoryId}`);

        return {
            id: e.id,
            category,
            sum: e.sum,
            comment: e.comment,
            date: e.date,
        };
    });

    return {
        type: SET_EXPENSES,
        expenses,
    };
};

export interface IAddExpenseAction {
    type: string;
    expenses: IExpense[];
}

export function addExpense(expense: IExpense): AsyncAction {
    return async (dispatch, getState) => {
        const expenses = getState().expenses.concat([expense]);

        dispatch({
            type: ADD_EXPENSE,
            expenses,
        });
    };
}

export const startEditingExpense = (expense?: IExpense) => {
    return {
        type: START_EDITING_EXPENSE,
        expense,
    };
};

export const editExpense = (values: IExpenseValues) => {
    return {
        type: EDIT_EXPENSE,
        values,
    };
};

export interface ISaveEditedExpenseAction {
    type: string;
    expenses: IExpense[];
}

export function saveEditedExpense(): AsyncAction {
    return async (dispatch, getState) => {
        const { expenses, editingExpense } = getState();

        if (!editingExpense.id) {
            throw new Error(`No id`);
        }

        const index = expenses.findIndex(e => e.id === editingExpense.id);
        if (!index) {
            throw new Error(`Expense not found`);
        }

        const newExpenses = [
            ...expenses.slice(0, index),
            editingExpense,
            ...expenses.slice(index + 1),
        ];

        dispatch({
            type: SAVE_EDITED_EXPENSE,
            expenses: newExpenses,
        });
    };
}

export function saveExpenses(): AsyncAction {
    return async (dispatch, getState) => {
        const { expenses, categories } = getState();

        const expensesData: IExpenseData[] = expenses.map(e => {
            const category = categories.expenses.find(c => c === e.category);
            if (!category) throw new Error(`No category ${e.category}`);

            return {
                id: e.id,
                categoryId: category.id,
                sum: e.sum,
                comment: e.comment,
                date: e.date,
            };
        });
        AsyncStorage.setItem('expenses', JSON.stringify(expensesData));

        dispatch({
            type: SAVE_EXPENSES,
            expenses,
        });
    };
}

export function loadCategories(): AsyncAction {
    return async (dispatch) => {
        const json = await AsyncStorage.getItem('categories');
        const categories: ICategory[] = JSON.parse(json);
        dispatch(setCategories(categories));
    };
}

export function loadExpenses(): AsyncAction {
    return async (dispatch, getState) => {
        const json = await AsyncStorage.getItem('expenses');
        const expenses: IExpenseData[] = JSON.parse(json);
        dispatch(setExpenses(expenses, getState().categories.expenses));
        dispatch(calculateBalance(getState().expenses));
    };
}

export function loadApplicationData(): AsyncAction {
    return async (dispatch) => {
        await dispatch(loadCategories());
        await dispatch(loadExpenses());
    };
}
