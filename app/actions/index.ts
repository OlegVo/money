import { ActionCreatorsMapObject } from 'redux';
import * as actionsFunctions from './actions';
import { ICategory, IExpense, IExpenseValues, Page } from '../interfaces';

export interface IAction {
    type: string;
    [data: string]: any;
}

export interface IActions {
    setPage: (page: Page) => IAction;
    pushPage: (page: Page) => IAction;
    popPage: () => IAction;
    calculateBalance: (expenses: IExpense[]) => IAction;
    setCategories: (categories?: ICategory[]) => IAction;
    setExpenses: (expenses?: IExpense[]) => IAction;
    addExpense: (category: ICategory, sum: number, comment: string, date: string) => IAction;
    startEditingExpense: () => IAction;
    editExpense: (values: IExpenseValues) => IAction;
}

export type IActionCreators = IActions & ActionCreatorsMapObject;

const actions: IActionCreators = {
    ...actionsFunctions,
};

export default actions;
