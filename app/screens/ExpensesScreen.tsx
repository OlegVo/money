import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';
import { ExpensesList } from '../components/index';
import { IAppState, ICategoriesState, IExpense, Page } from '../interfaces/index';
import { IActions } from '../actions/index';

interface IPropsT {
    expenses: IExpense[];
    categories: ICategoriesState;
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class ExpensesScreen extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.addExpense = this.addExpense.bind(this);
    }

    addExpense() {
        this.props.actions.startEditingExpense();
        this.props.actions.pushPage(Page.Categories);
    }

    render() {
        const { expenses, categories, currency } = this.props;

        return (
            <View style={styles.container}>
                {expenses &&
                    <ExpensesList
                        expenses={expenses}
                        categories={categories.expenses}
                        currency={currency}
                    />
                }

                <TouchableOpacity style={[styles.button, styles.addExpenseButton]} onPress={this.addExpense}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: styleConstants.MENU_PADDING,
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
    },
    button: {
        position: 'absolute',
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: styleConstants.BASE_FONT_COLOR,
    },
    addExpenseButton: {
        bottom: styleConstants.BUTTON_PADDING,
        right: styleConstants.BUTTON_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: styleConstants.BASE_FONT_COLOR,
        fontSize: 34,
        textAlign: 'center',
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    expenses: state.expenses,
    categories: state.categories,
    currency: state.currency,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpensesScreen);
export { connected as ExpensesScreen };
