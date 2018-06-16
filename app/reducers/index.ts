import { combineReducers, Reducer } from 'redux';

import balance from './balance';
import categories from './categories';
import currency from './currency';
import editingExpense from './editingExpense';
import expenses from './expenses';
import navigation from './navigation';
import planning from './planning';

import { IAppState } from '../interfaces';

const reducers = {
    balance,
    categories,
    currency,
    editingExpense,
    expenses,
    navigation,
    planning,
};

const rootReducer: Reducer<IAppState> = combineReducers({
    ...reducers,
});
export default rootReducer;
