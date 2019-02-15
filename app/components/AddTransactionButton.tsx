import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR } from '../constants/styles';
import * as styleConstants from '../constants/styles';
import { IActions } from '../actions';
import { Page } from '../types';

interface IProps {
    actions: IActions;
}

export class AddTransactionButton extends React.PureComponent<IProps> {
    addExpense = () => {
        this.props.actions.startEditingExpense();
        this.props.actions.pushPage(Page.Categories);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.button, styles.addExpenseButton]} onPress={this.addExpense}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: BLUE_FONT_COLOR,
        backgroundColor: '#fff',
    },
    addExpenseButton: {
        top: 10,
        right: BASE_HORIZONTAL_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: BLUE_FONT_COLOR,
        fontSize: 34,
        textAlign: 'center',
    },
});
