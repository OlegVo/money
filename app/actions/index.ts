import { ActionCreatorsMapObject } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as actionsFunctions from './actions';
import { IAppState, ICategories, ICategory, IExpense, IExpenseData, IExpenseValues, IPlanning, Page } from '../types';
import { ISetRangeAction } from './actions';

export interface IAction {
    type: string;
    [data: string]: any;
}

export type AsyncAction = ThunkAction<Promise<any>, IAppState, any, IAction>;

export interface IActions {
    setPage: (page: Page) => IAction;
    pushPage: (page: Page) => IAction;
    popPage: () => IAction;
    calculateBalance: (planning: IPlanning, monthPlansexpenses: IExpense[]) => IAction;
    setCategories: (categories: ICategories) => IAction;
    addCategory: (category: ICategory) => AsyncAction;
    setExpenses: (expensesData: IExpenseData[], categories: ICategory[]) => IAction;
    addExpense: (expense: IExpense) => AsyncAction;
    startEditingExpense: (expense?: IExpense) => IAction;
    editExpense: (values: IExpenseValues) => IAction;
    saveEditedExpense: () => AsyncAction;
    deleteExpense: (expenseId: string) => AsyncAction;
    saveExpenses: () => AsyncAction;
    loadApplicationData: () => AsyncAction;
    setRange: (startDate: string, endDate: string) => ISetRangeAction;
    setCurrentMonth: () => ISetRangeAction;
}

export type IActionCreators = IActions & ActionCreatorsMapObject;

const actionsCreators: IActionCreators = {
    ...actionsFunctions,
};

export default actionsCreators;
