import { generateId } from './id';
import { ICategory } from '../interfaces';

const colors: string[] = [
    '#88b1d0',
    '#ff765b',
    '#a68255',
    '#FFCB40',
    '#BF7E30',
    '#FF6B40',
    '#b44bff',
    '#8baeff',
    '#ff9c69',
    '#e6caff',
    '#adc6ff',
    '#ff9c69',
];

// TODO можно сделать дефолтные категории
// const expensesCategories: ICategory[] = [
//     { id: '0', name: 'Обеды', color: '#88b1d0' },
//     { id: '1', name: 'Продукты', color: '#ff765b' },
//     { id: '2', name: 'Общее', color: '#a68255' },
//     { id: '3', name: 'Автомобиль', color: '#FFCB40' },
//     { id: '4', name: 'Фастфуд', color: '#BF7E30' },
//     { id: '5', name: 'Медицина', color: '#FF6B40' },
//     { id: '6', name: 'Работа (др и пр.)', color: '#b44bff' },
//     { id: '7', name: 'Ремонт', color: '#8baeff' },
//     { id: '8', name: 'Одежда', color: '#ff9c69' },
//     { id: '9', name: 'Развлечения', color: '#e6caff' },
// ];

export function getRandomCategoryColor() {
    const index = Math.floor(Math.random() * colors.length) || 0;
    return colors[index];
}

export function makeCategory({ name }: { name: string }): ICategory {
    return { id: generateId(), name, color: getRandomCategoryColor() };
}
