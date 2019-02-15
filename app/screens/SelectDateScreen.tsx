import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState, IExpenseValues } from '../types';
import { IActions } from '../actions';
import { DatePicker, NavigationBar } from '../components';
import * as formats from '../constants/formats';
import { Moment } from 'moment';

interface IPropsT {
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & { actions: IActions };

class SelectDateScreen extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.onSelectDate = this.onSelectDate.bind(this);
    }

    onSelectDate(date: Moment) {
        const { actions } = this.props;

        actions.editExpense({date: date.format(formats.DATE_FORMAT)});
        actions.popPage();
    }

    render() {
        const { editingExpense, actions } = this.props;

        if (!editingExpense.date) return null;

        return (
            <View style={styles.container}>
                <NavigationBar actions={actions} />

                <DatePicker date={editingExpense.date} onSelectDate={this.onSelectDate} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    editingExpense: state.editingExpense,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectDateScreen);
export { connected as SelectDateScreen };
