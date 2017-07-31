import { combineReducers } from 'redux';

import balance from './balance';

const reducers = {
    balance,
};

const rootReducer = combineReducers({
    ...reducers,
});
export default rootReducer;

// export { default as balance } from './balance';
// export { default as expenses } from './expenses';
// export { default as categories } from './categories';
// export { default as currency } from './currency';
// export { default as navigation } from './navigation';
