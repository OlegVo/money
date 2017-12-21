export interface IAppState {
    balance: number;
    categories: ICategoriesState;
    currency: string;
    editingExpense: IExpenseValues;
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

export interface IExpenseValues {
    category?: ICategory;
    sum?: number;
    comment?: string;
    date?: string;
}

export interface INavigationState {
    pages: Page[];
}

export enum Page {
    Balance = 'Balance',
    AddExpense = 'AddExpense',
    SelectDate = 'SelectDate',
    Planning = 'Planning',
    Expenses = 'Expenses',
}

export interface IMenuItem {
    page: Page;
    text: string;
    icon?: string;
}
