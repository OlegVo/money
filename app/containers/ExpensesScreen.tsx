import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';

import { ExpensesList } from '../components';

class ExpensesScreen extends React.Component<any, {}> {
    // static propTypes = {
    //     expenses: PropTypes.array.isRequired,
    //     categories: PropTypes.object.isRequired,
    //     currency: PropTypes.string.isRequired,
    //     actions: PropTypes.object.isRequired,
    // };

    constructor(props) {
        super(props);

        this.addExpense = this.addExpense.bind(this);
    }

    addExpense() {
        this.props.actions.changePage('addExpense');
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

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(ExpensesScreen);
export { connected as ExpensesScreen };
