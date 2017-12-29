import { ICategoriesState, ICategory } from '../interfaces';

const expensesCategories: ICategory[] = [
    { id: '0', name: 'Обеды', color: '#3C9DD0' },
    { id: '1', name: 'Продукты', color: '#FF6B40' },
    { id: '2', name: 'Общее', color: '#A65A00' },
    { id: '3', name: 'Автомобиль', color: '#FFCB40' },
    { id: '4', name: 'Фастфуд', color: '#BF7E30' },
    { id: '5', name: 'Медицина', color: '#FF6B40' },
    { id: '6', name: 'Работа (др и пр.)', color: '#b44bff' },
];

const defaultCategories = {
    expenses: expensesCategories,
};

const reducer = (state: ICategoriesState = { expenses: [] }, action): ICategoriesState => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.categories || defaultCategories;

        default:
            return state;
    }
};

export default reducer;
