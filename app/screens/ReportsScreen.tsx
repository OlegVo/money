import * as React from 'react';
import * as moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState } from '../interfaces/index';
import { IActions } from '../actions/index';
import {
    MENU_PADDING,
} from '../constants/styles';
import { ExpensesReport } from '../components';
import { ICategoriesState, IExpense } from '../interfaces';

interface IPropsT {
    categories: ICategoriesState;
    expenses: IExpense[];
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class ReportsScreen extends React.PureComponent<IProps> {
    render() {
        const { expenses, categories, currency } = this.props;

        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month');

        return (
            <View style={styles.container}>
                <ExpensesReport
                    startDate={startDate}
                    endDate={endDate}
                    expenses={expenses}
                    categories={categories.expenses}
                    currency={currency}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: MENU_PADDING,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    categories: state.categories,
    expenses: state.expenses,
    currency: state.currency,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsScreen);
export { connected as ReportsScreen };
