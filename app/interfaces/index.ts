export interface IAppState {
    balance: number;
    categories: ICategoriesState;
    currency: string;
    editingExpense: IExpenseValues;
    expenses: IExpense[];
    navigation: INavigationState;
    planning: IPlanning;
}

export interface ICategoriesState {
    expenses: ICategory[];
}

export interface ICategory {
    id: string;
    name: string;
    color: string;
}

export interface IExpenseData {
    id: string;
    categoryId: string;
    sum: number;
    comment: string;
    date: string;
}

export interface IExpense {
    id: string;
    category: ICategory;
    sum: number;
    comment: string;
    date: string;
}

export interface IExpenseValues {
    id?: string;
    category?: ICategory;
    sum?: number;
    comment?: string;
    date?: string;
}

export interface IIncome {
    id: string;
    sum: number;
    date: string;
    comment: string;
}

export interface INavigationState {
    pages: Page[];
}

export enum Page {
    Balance = 'Balance',
    EditExpense = 'EditExpense',
    Categories = 'Categories',
    SelectDate = 'SelectDate',
    Planning = 'Planning',
    Reports = 'Reports',
}

export interface IMenuItem {
    page: Page;
    text: string;
    icon?: string;
}

export interface IPlanning {
    monthPlans: IMonthPlan[];
}

export interface IMonthPlan {
    month: string;
    incomes: IIncome[];
}
