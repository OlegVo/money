import { combineReducers, Reducer } from 'redux';

import balance from './balance';
import categories from './categories';
import currency from './currency';
import editingExpense from './editingExpense';
import expenses from './expenses';
import navigation from './navigation';

import { IAppState } from '../interfaces/index';

const reducers = {
    balance,
    categories,
    currency,
    editingExpense,
    expenses,
    navigation,
};

const rootReducer: Reducer<IAppState> = combineReducers({
    ...reducers,
});
export default rootReducer;
