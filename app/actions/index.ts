import { ActionCreatorsMapObject } from 'redux';
import * as actionsFunctions from './actions';
import { ICategory, IExpense, Page } from '../interfaces';

export interface IAction {
    type: string;
    [data: string]: any;
}

export interface IActions {
    changePage: (page: Page) => IAction;
    calculateBalance: (expenses: IExpense[]) => IAction;
    setCategories: (categories?: ICategory[]) => IAction;
    setExpenses: (expenses?: IExpense[]) => IAction;
    addExpense: (category: ICategory, sum: number, comment: string, date: string) => IAction;
}

export type IActionCreators = IActions & ActionCreatorsMapObject;

const actions: IActionCreators = {
    ...actionsFunctions,
};

export default actions;
