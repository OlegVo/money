import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions/index';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import { NavigationBar } from '../components';
import { IAppState, IExpenseValues, Page } from '../interfaces';
import {
    BASE_FONT_COLOR, BASE_FONT_SIZE, BASE_HORIZONTAL_PADDING, GRAY_FONT_COLOR, LIST_BORDER_COLOR, MAIN_BACKGROUND_COLOR,
    MENU_PADDING,
    WHITE_FONT_COLOR
} from '../constants/styles';
import { generateId } from '../helpers/id';

interface IPropsT {
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & {actions: IActions};

class EditExpenseScreen extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.selectCategory = this.selectCategory.bind(this);
        this.showSelectDateScreen = this.showSelectDateScreen.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.submit = this.submit.bind(this);
    }

    selectCategory() {
        this.props.actions.pushPage(Page.Categories);
    }

    showSelectDateScreen() {
        this.props.actions.pushPage(Page.SelectDate);
    }

    changeSum(value: string) {
        const sum = parseInt(value.replace(/\D/g, ''), 10);
        this.props.actions.editExpense({sum});
    }

    changeComment(comment: string) {
        this.props.actions.editExpense({comment});
    }

    submit() {
        const { actions, editingExpense } = this.props;
        const { category, sum, comment, date } = editingExpense;

        if (editingExpense.id) {
            actions.saveEditedExpense();
        } else {
            if (!category || !sum || comment === undefined || !date) {
                throw new Error('invalid expense data');
            }

            actions.addExpense({ id: generateId(), category, sum, comment, date });
        }
        actions.saveExpenses();

        actions.setPage(Page.Balance);
    }

    render() {
        const { editingExpense, actions } = this.props;
        const { category, sum, comment, date } = editingExpense;

        const d = moment(date, formats.DATE_FORMAT);
        const dateString = d.format('LL').replace(/,?\s?\d+\s?\D*$/, '');
        let dateComment;
        if (date === moment().format(formats.DATE_FORMAT)) {
            dateComment = 'сегодня';
        } else {
            dateComment = d.format('dddd');
        }

        return (
            <View style={styles.container}>
                <NavigationBar submit={this.submit} actions={actions} />

                {category &&
                    <View style={styles.addExpenseForm}>
                        <TouchableOpacity style={[styles.field, styles.category, {backgroundColor: category.color}]} onPress={this.selectCategory}>
                            <Text style={styles.categoryText}>{category.name}</Text>
                            <Text style={[styles.categoryText, styles.arrow]}>{'>'}</Text>
                        </TouchableOpacity>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={sum ? sum.toString() : ''}
                                onChangeText={this.changeSum}
                                autoFocus={true}
                                selectionColor={BASE_FONT_COLOR}
                                placeholder='Сумма'
                                keyboardType='numeric'
                            />
                        </View>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={this.changeComment}
                                selectionColor={BASE_FONT_COLOR}
                                placeholder='Комментарий'
                                placeholderTextColor={GRAY_FONT_COLOR}
                                returnKeyType='done'
                                onSubmitEditing={this.submit}
                            />
                        </View>

                        <TouchableOpacity style={[styles.field, styles.date]} onPress={this.showSelectDateScreen}>
                            <Text style={styles.dateText}>{dateString}</Text>
                            <Text style={styles.dateCommentText}>{dateComment}</Text>
                            <Text style={[styles.dateText, styles.arrow]}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addExpenseForm: {
        paddingTop: MENU_PADDING,
    },
    field: {
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: LIST_BORDER_COLOR,
    },
    fieldText: {
        color: BASE_FONT_COLOR,
        fontSize: BASE_FONT_SIZE,
    },
    input: {
        height: 30,
        color: BASE_FONT_COLOR,
        fontSize: BASE_FONT_SIZE,
    },
    category: {
        height: 50,
        borderBottomWidth: 0,
    },
    categoryText: {
        fontSize: BASE_FONT_SIZE,
        color: WHITE_FONT_COLOR,
        lineHeight: 30,
    },
    date: {
        height: 50,
        flexDirection: 'row',
    },
    dateText: {
        color: MAIN_BACKGROUND_COLOR,
        fontSize: BASE_FONT_SIZE,
        lineHeight: 30,
    },
    dateCommentText: {
        marginLeft: 8,
        fontSize: BASE_FONT_SIZE - 2,
        color: GRAY_FONT_COLOR,
        lineHeight: 30,
    },
    arrow: {
        position: 'absolute',
        right: BASE_HORIZONTAL_PADDING,
        top: 10,
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
)(EditExpenseScreen);
export { connected as EditExpenseScreen };
