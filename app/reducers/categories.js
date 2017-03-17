
const expensesCategories = [
    {name: 'Обеды'},
    {name: 'Продукты'},
    {name: 'Общее'},
];

const categories = {
    expenses: expensesCategories
};

const reducer = (state = categories, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
