import { ICategoriesState, ICategory } from '../interfaces';

const expensesCategories: ICategory[] = [
    { id: '0', name: 'Обеды', color: '#88b1d0' },
    { id: '1', name: 'Продукты', color: '#ff765b' },
    { id: '2', name: 'Общее', color: '#a68255' },
    { id: '3', name: 'Автомобиль', color: '#FFCB40' },
    { id: '4', name: 'Фастфуд', color: '#BF7E30' },
    { id: '5', name: 'Медицина', color: '#FF6B40' },
    { id: '6', name: 'Работа (др и пр.)', color: '#b44bff' },
    { id: '7', name: 'Ремонт', color: '#8baeff' },
    { id: '8', name: 'Одежда', color: '#ff9c69' },
    { id: '9', name: 'Развлечения', color: '#e6caff' },
    { id: '10', name: 'English', color: '#adc6ff' },
    { id: '11', name: 'Саша', color: '#ff9c69' },
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
