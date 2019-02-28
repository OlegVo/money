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
    colors, deleteButton,
    fonts,
    GRAY_FONT_COLOR,
    list,
    LIST_BORDER_COLOR,
    MAIN_BACKGROUND_COLOR,
    WHITE_FONT_COLOR
} from '../constants/styles';
import { generateId } from '../helpers/id';
import { NavigationBar, IButton } from '../components/NavigationBar';
import { Arrow } from '../components/common/Arrow';
import { NO_CATEGORY } from '../constants/strings';
import { WideButton } from '../components/WideButton';

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
        const { actions } = this.props;
        actions.popPage();
    }

    submit() {
        const { actions, editingExpense } = this.props;
        const { category, sum, comment, date } = editingExpense;

        if (editingExpense.id) {
            throw new Error('no submit for expense editing');
        }

        if (!sum || comment === undefined || !date) {
            throw new Error('invalid expense data');
        }

        actions.addExpense({ type: 'expense', id: generateId(), category, sum, comment, date });
        actions.saveExpenses();

        actions.setPage(Page.Balance);
    }

    save = () => {
        const { actions, editingExpense } = this.props;

        if (!editingExpense.id) {
            throw new Error('no save for new expense');
        }

        actions.saveEditedExpense();
        actions.saveExpenses();
        actions.popPage();
    };

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
            ? { text: 'Сохранить', onPress: this.save }
            : { text: 'Готово', onPress: this.submit };

        return <View style={s.container}>
                <NavigationBar back={this.back} rightButton={rightButton} actions={actions} />

                <View style={s.addExpenseForm}>
                    <View style={s.field}>
                        <TextInput style={[s.input, s.sumInput]} value={sum ? sum.toString() : ''} onChangeText={this.changeSum} autoFocus={!editingExpense.id} selectionColor={colors.baseFont} placeholder='Сумма' keyboardType='numeric' />
                    </View>

                    <TouchableOpacity style={[s.field, s.category, { backgroundColor: category && category.color }]} onPress={this.selectCategory}>
                        <Text style={category ? s.categoryText : s.noCategoryText}>{category ? category.name : NO_CATEGORY}</Text>
                        <Arrow height={list.item.height} color={category ? WHITE_FONT_COLOR : undefined} />
                    </TouchableOpacity>

                    <View style={s.field}>
                        <TextInput style={s.input} value={comment} onChangeText={this.changeComment} selectionColor={colors.baseFont} placeholder='Комментарий' placeholderTextColor={GRAY_FONT_COLOR} returnKeyType='done' onSubmitEditing={this.submit} />
                    </View>

                    <TouchableOpacity style={[s.field, s.date]} onPress={this.showSelectDateScreen}>
                        <Text style={s.dateText}>{dateString}</Text>
                        <Text style={s.dateCommentText}>{dateComment}</Text>
                        <Arrow height={list.item.height} color={MAIN_BACKGROUND_COLOR} />
                    </TouchableOpacity>
                </View>

                {!!editingExpense.id && <WideButton text='Удалить транзакцию' textColor={deleteButton.textColor} onPress={this.delete} actions={actions} />}
            </View>;
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addExpenseForm: {
        paddingBottom: deleteButton.marginTop,
    },
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
        // borderBottomWidth: 0,
    },
    categoryText: {
        ...fonts.base,
        color: WHITE_FONT_COLOR,
        lineHeight: 30,
    },
    noCategoryText: {
        ...fonts.base,
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
