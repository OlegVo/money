import { ICategories, ICategory, IExpense, IExpenseData, IExpenseValues, IPlanning, Page } from '../types';
import {
    ADD_CATEGORY,
    ADD_EXPENSE,
    CALCULATE_BALANCE,
    DELETE_EXPENSE,
    EDIT_EXPENSE,
    POP_PAGE,
    PUSH_PAGE,
    SAVE_EDITED_EXPENSE,
    SAVE_EXPENSES,
    SET_CATEGORIES,
    SET_EXPENSES,
    SET_PAGE,
    SET_PLANS,
    SET_RANGE,
    START_EDITING_EXPENSE,
} from './types';
import { AsyncAction } from './index';
import { AsyncStorage } from 'react-native';
import { api } from '../api';
import { DATE_FORMAT } from '../constants/formats';
const moment = require('moment');

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

export interface ICalculateBalanceAction {
    planning: IPlanning;
    expenses: IExpense[];
    type: string;
}
export const calculateBalance = (planning: IPlanning, expenses: IExpense[]) => {
    return {
        type: CALCULATE_BALANCE,
        planning,
        expenses,
    };
};

export interface ISetCategoriesAction {
    type: string;
    categories: ICategories;
}
export const setCategories = (categories: ICategories): ISetCategoriesAction => {
    return {
        type: SET_CATEGORIES,
        categories,
    };
};

export interface IAddCategoryAction {
    type: string;
    category: ICategory;
    categories: ICategories;
}
export const addCategory = (category: ICategory): AsyncAction => {
    return async (dispatch, getState) => {
        const state = getState();
        const categories = {
            ...state.categories,
            expenses: state.categories.expenses.concat([category]),
        };

        // сначала добавляем категорию, чтобы она сразу появилась в списке
        dispatch({ type: ADD_CATEGORY, category, categories });

        // потом пытаемся синхронизировать
        await api.saveCategories(categories);
    };
};

interface ISetExpensesAction {
    expenses: IExpense[];
    type: string;
}

export const setExpenses = (expensesData: IExpenseData[], categories: ICategory[]): ISetExpensesAction => {
    const expenses = expensesData.map(e => {
        const category = e.categoryId ? categories.find(c => c.id === e.categoryId) : undefined;

        return {
            type: 'expense' as 'expense',
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

        dispatch({
            type: CALCULATE_BALANCE,
            expenses,
            planning: getState().planning,
        });
    };
}

export interface IDeleteExpenseAction {
    type: string;
    expenses: IExpense[];
}

export function deleteExpense(expenseId: string): AsyncAction {
    return async (dispatch, getState) => {
        const expenses = getState().expenses.filter(e => e.id !== expenseId);

        dispatch({
            type: DELETE_EXPENSE,
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

        const newExpenses = [...expenses.slice(0, index), editingExpense, ...expenses.slice(index + 1)];

        dispatch({
            type: SAVE_EDITED_EXPENSE,
            expenses: newExpenses,
        });

        dispatch({
            type: CALCULATE_BALANCE,
            expenses: newExpenses,
            planning: getState().planning,
        });
    };
}

export function saveExpenses(): AsyncAction {
    return async (dispatch, getState) => {
        const { expenses, categories } = getState();

        const expensesData: IExpenseData[] = expenses.map(e => {
            const category = e.category && categories.expenses.find(c => c === e.category);

            return {
                id: e.id,
                categoryId: category && category.id,
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

export interface ISetPlans {
    planning: IPlanning;
    type: string;
}
export const setPlans = (planning: IPlanning): ISetPlans => {
    return {
        type: SET_PLANS,
        planning,
    };
};

export function loadCategories(): AsyncAction {
    return async dispatch => {
        const categories: ICategories | undefined = await api.loadCategories();
        if (categories) {
            dispatch(setCategories(categories));
        }
    };
}

export function loadExpenses(): AsyncAction {
    return async (dispatch, getState) => {
        const json = await AsyncStorage.getItem('expenses');
        let expenses: IExpenseData[] = [];
        if (json) {
            try {
                expenses = JSON.parse(json);
            } catch (_e) {
                // nothing
            }
        }
        dispatch(setExpenses(expenses, getState().categories.expenses));
        dispatch(calculateBalance(getState().planning, getState().expenses));
    };
}

export function loadPlans(): AsyncAction {
    return async dispatch => {
        const planning = {
            monthPlans: [
                {
                    month: '06.2018',
                    incomes: [
                        { type: 'income' as 'income', id: '1', sum: 95000.0, date: '14.06.2018', comment: '' },
                        { type: 'income' as 'income', id: '2', sum: 30000.0, date: '29.06.2018', comment: '' },
                    ],
                },
            ],
        };

        dispatch(setPlans(planning));
    };
}

export function loadApplicationData(): AsyncAction {
    return async dispatch => {
        await dispatch(loadCategories());
        await dispatch(loadPlans());
        await dispatch(loadExpenses());
    };
}

export interface ISetRangeAction {
    startDate: string;
    endDate: string;
    type: string;
}
export const setRange = (startDate: string, endDate: string): ISetRangeAction => {
    return {
        type: SET_RANGE,
        startDate,
        endDate,
    };
};

export interface ISetCurrentMonthAction {
    type: string;
}
export const setCurrentMonth = (): ISetRangeAction => {
    const startDate = moment()
        .startOf('month')
        .format(DATE_FORMAT);
    const endDate = moment()
        .endOf('month')
        .format(DATE_FORMAT);
    return {
        type: SET_RANGE,
        startDate,
        endDate,
    };
};
