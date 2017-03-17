
export const changePage = (page) => {
    return {
        type: 'CHANGE_PAGE',
        page,
    };
};

export const addExpence = ({category, sum, comment, date}) => {
    return {
        type: 'ADD_EXPENCE',
        category, sum, comment, date,
    };
};
