import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as styleConstants from '../constants/styles';
import { IActions } from '../actions';
import { Page } from '../types';
import { ListItem } from './common/ListItem';

interface IProps {
    actions: IActions;
}

export class AddTransactionButton extends React.PureComponent<IProps> {
    addExpense = () => {
        this.props.actions.startEditingExpense();
        this.props.actions.pushPage(Page.Categories);
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.addExpense}>
                    <ListItem text='Добавить расход' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
