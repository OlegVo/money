import { ActionCreatorsMapObject } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as actionsFunctions from './actions';
import { IAppState, ICategory, IExpense, IExpenseData, IExpenseValues, IPlanning, Page } from '../interfaces';

export interface IAction {
    type: string;
    [data: string]: any;
}

export type AsyncAction = ThunkAction<Promise<any>, IAppState, any>;

export interface IActions {
    setPage: (page: Page) => IAction;
    pushPage: (page: Page) => IAction;
    popPage: () => IAction;
    calculateBalance: (planning: IPlanning, monthPlansexpenses: IExpense[]) => IAction;
    setCategories: (categories: ICategory[]) => IAction;
    setExpenses: (expensesData: IExpenseData[], categories: ICategory[]) => IAction;
    addExpense: (expense: IExpense) => AsyncAction;
    startEditingExpense: (expense?: IExpense) => IAction;
    editExpense: (values: IExpenseValues) => IAction;
    saveEditedExpense: () => AsyncAction;
    deleteExpense: (expenseId: string) => AsyncAction;
    saveExpenses: () => AsyncAction;
    loadApplicationData: () => AsyncAction;
}

export type IActionCreators = IActions & ActionCreatorsMapObject;

const actionsCreators: IActionCreators = {
    ...actionsFunctions,
};

export default actionsCreators;
