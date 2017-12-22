import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions/index';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import { NavigationBar } from '../components';
import { IAppState, IExpenseValues, Page } from '../interfaces';
import { WHITE_FONT_COLOR } from '../constants/styles';

interface IPropsT {
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & {actions: IActions};

class AddExpenseScreen extends React.PureComponent<IProps, {}> {
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

        if (!category || !sum || comment === undefined || !date) return;

        actions.addExpense(category, sum, comment, date);

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
                                selectionColor={styleConstants.BASE_FONT_COLOR}
                                placeholder='Сумма'
                                keyboardType='numeric'
                            />
                        </View>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={this.changeComment}
                                selectionColor={styleConstants.BASE_FONT_COLOR}
                                placeholder='Комментарий'
                                placeholderTextColor={styleConstants.GRAY_FONT_COLOR}
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
        paddingTop: 20,
    },
    field: {
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    fieldText: {
        color: styleConstants.BASE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
    },
    input: {
        height: 30,
        color: styleConstants.BASE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
    },
    category: {
        height: 50,
        borderBottomWidth: 0,
    },
    categoryText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: WHITE_FONT_COLOR,
        lineHeight: 30,
    },
    date: {
        height: 50,
        flexDirection: 'row',
    },
    dateText: {
        color: styleConstants.MAIN_BACKGROUND_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
        lineHeight: 30,
    },
    dateCommentText: {
        marginLeft: 8,
        fontSize: styleConstants.BASE_FONT_SIZE - 2,
        color: styleConstants.GRAY_FONT_COLOR,
        lineHeight: 30,
    },
    arrow: {
        position: 'absolute',
        right: styleConstants.BASE_HORIZONTAL_PADDING,
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
)(AddExpenseScreen);
export { connected as AddExpenseScreen };
