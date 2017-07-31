import { ActionCreatorsMapObject } from 'redux';
import * as actionsFunctions from './actions';

export interface IAction {
    type: string;
    [data: string]: any;
}

export interface IActions {
    changePage: (page: any) => IAction;
}

export type IActionCreators = IActions & ActionCreatorsMapObject;

const actions: IActionCreators = {
    ...actionsFunctions,
};

export default actions;
