export interface IAppState {
    balance: number;
    categories: ICategoriesState;
    currency: string;
    expenses: IExpense[];
    navigation: INavigationState;
}

export interface ICategoriesState {
    expenses: ICategory[];
}

export interface ICategory {
    id: number;
    name: string;
    color: string;
}

export interface IExpense {
    category: ICategory;
    sum: number;
    comment: string;
    date: string;
}

export interface INavigationState {
    page: Page;
}

export enum Page {
    Balance = 'Balance',
    AddExpence = 'AddExpence',
    Planning = 'Planning',
    Expenses = 'Expenses',
}

export interface IMenuItem {
    page: Page;
    text: string;
    icon?: string;
}
