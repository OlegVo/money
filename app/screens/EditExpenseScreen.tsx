import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions/index';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import { IAppState, IExpenseValues, Page } from '../types';
import {
    BASE_HORIZONTAL_PADDING,
    colors,
    fonts,
    GRAY_FONT_COLOR,
    list,
    LIST_BORDER_COLOR,
    MAIN_BACKGROUND_COLOR,
    WHITE_FONT_COLOR,
} from '../constants/styles';
import { generateId } from '../helpers/id';
import { NavigationBar, IButton } from '../components/NavigationBar';
import { Arrow } from '../components/common/Arrow';

interface IPropsT {
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & { actions: IActions };

class EditExpenseScreen extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.selectCategory = this.selectCategory.bind(this);
        this.showSelectDateScreen = this.showSelectDateScreen.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.back = this.back.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    selectCategory() {
        this.props.actions.pushPage(Page.Categories);
    }

    showSelectDateScreen() {
        this.props.actions.pushPage(Page.SelectDate);
    }

    changeSum(value: string) {
        const sum = parseInt(value.replace(/\D/g, ''), 10);
        this.props.actions.editExpense({ sum });
    }

    changeComment(comment: string) {
        this.props.actions.editExpense({ comment });
    }

    back() {
        const { actions, editingExpense } = this.props;

        if (editingExpense.id) {
            actions.saveEditedExpense();
            actions.saveExpenses();
        } else {
            actions.editExpense({ category: undefined });
        }

        actions.popPage();
    }

    submit() {
        const { actions, editingExpense } = this.props;
        const { category, sum, comment, date } = editingExpense;

        if (editingExpense.id) {
            throw new Error('no submit for expense editing');
        }

        if (!category || !sum || comment === undefined || !date) {
            throw new Error('invalid expense data');
        }

        actions.addExpense({ type: 'expense', id: generateId(), category, sum, comment, date });
        actions.saveExpenses();

        actions.setPage(Page.Balance);
    }

    delete() {
        const { actions, editingExpense } = this.props;

        if (!editingExpense.id) {
            throw new Error('no delete for expense editing');
        }

        // TODO добавить конфирмейшен

        actions.deleteExpense(editingExpense.id);
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

        const rightButton: IButton = editingExpense.id
            ? { text: 'Удалить', onPress: this.delete }
            : { text: 'Готово', onPress: this.submit };

        return (
            <View style={styles.container}>
                <NavigationBar back={this.back} rightButton={rightButton} actions={actions} />

                {category && (
                    <View style={styles.addExpenseForm}>
                        <View style={styles.field}>
                            <TextInput
                                style={[styles.input, styles.sumInput]}
                                value={sum ? sum.toString() : ''}
                                onChangeText={this.changeSum}
                                autoFocus={!editingExpense.id}
                                selectionColor={colors.baseFont}
                                placeholder='Сумма'
                                keyboardType='numeric'
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.field, styles.category, { backgroundColor: category.color }]}
                            onPress={this.selectCategory}
                        >
                            <Text style={styles.categoryText}>{category.name}</Text>
                            <Arrow height={list.item.height} color={WHITE_FONT_COLOR} />
                        </TouchableOpacity>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={this.changeComment}
                                selectionColor={colors.baseFont}
                                placeholder='Комментарий'
                                placeholderTextColor={GRAY_FONT_COLOR}
                                returnKeyType='done'
                                onSubmitEditing={this.submit}
                            />
                        </View>

                        <TouchableOpacity style={[styles.field, styles.date]} onPress={this.showSelectDateScreen}>
                            <Text style={styles.dateText}>{dateString}</Text>
                            <Text style={styles.dateCommentText}>{dateComment}</Text>
                            <Arrow height={list.item.height} color={MAIN_BACKGROUND_COLOR} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addExpenseForm: {},
    field: {
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: LIST_BORDER_COLOR,
    },
    fieldText: {
        ...fonts.base,
    },
    input: {
        height: 30,
        ...fonts.base,
    },
    sumInput: {
        height: 35,
        fontSize: 22,
    },
    category: {
        height: list.item.height,
        borderBottomWidth: 0,
    },
    categoryText: {
        ...fonts.base,
        color: WHITE_FONT_COLOR,
        lineHeight: 30,
    },
    date: {
        height: list.item.height,
        flexDirection: 'row',
    },
    dateText: {
        ...fonts.base,
        color: MAIN_BACKGROUND_COLOR,
        lineHeight: 30,
    },
    dateCommentText: {
        marginLeft: 8,
        fontSize: fonts.base.fontSize - 2,
        color: GRAY_FONT_COLOR,
        lineHeight: 30,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    editingExpense: state.editingExpense,
});

const mapDispatchToProps = (dispatch): { actions: IActions } => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditExpenseScreen);
export { connected as EditExpenseScreen };
