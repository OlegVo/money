export interface IAppState {
    balance: number;
    categories: ICategories;
    currency: string;
    editingExpense: IExpenseValues;
    expenses: IExpense[];
    navigation: INavigationState;
    planning: IPlanning;
    currentPeriod: IPeriod | null;
}

export interface IPeriod {
    startDate: string;
    endDate: string;
}

export interface ICategories {
    expenses: ICategory[];
}

export interface ICategory {
    id: string;
    name: string;
    color: string;
}

export interface IExpenseData {
    id: string;
    categoryId?: string;
    sum: number;
    comment: string;
    date: string;
}

export interface ITransaction {
    type: 'expense' | 'income';
    id: string;
    sum: number;
    comment: string;
    date: string;
}

export interface IExpense extends ITransaction {
    type: 'expense';
    category?: ICategory;
}

export interface IExpenseValues {
    id?: string;
    category?: ICategory;
    sum?: number;
    comment?: string;
    date?: string;
}

export interface IIncome extends ITransaction {
    type: 'income';
}

export interface INavigationState {
    pages: Page[];
}

export enum Page {
    Balance = 'Balance',
    EditExpense = 'EditExpense',
    Categories = 'Categories',
    EditCategory = 'EditCategory',
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
