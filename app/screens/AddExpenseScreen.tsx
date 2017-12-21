import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions/index';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import { CategoriesList } from '../components/index';
import { IAppState, ICategoriesState, IExpenseValues, Page } from '../interfaces/index';
import { WHITE_FONT_COLOR } from '../constants/styles';
const window = Dimensions.get('window');

const CONTENT_TOP = styleConstants.NAVIGATION_BAR_HEIGHT;
const CONTENT_HEIGHT = window.height - CONTENT_TOP - styleConstants.MENU_HEIGHT;

interface IPropsT {
    categories: ICategoriesState;
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & {actions: IActions};

class AddExpenseScreen extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearCategory = this.clearCategory.bind(this);
        this.showSelectDateScreen = this.showSelectDateScreen.bind(this);
        this.onChangeSum = this.onChangeSum.bind(this);
        this.submit = this.submit.bind(this);
    }

    back() {
        const { editingExpense, actions } = this.props;

        if (editingExpense.category) {
            this.clearCategory();
        } else {
            actions.popPage();
        }
    }

    selectCategory(category) {
        this.props.actions.editExpense({category});
    }

    clearCategory() {
        this.props.actions.editExpense({category: undefined});
    }

    showSelectDateScreen() {
        this.props.actions.pushPage(Page.SelectDate);
    }

    onChangeSum(value) {
        const sum = value.replace(/\D/g, '');
        this.setState({sum});
    }

    submit() {
        const { actions, editingExpense } = this.props;
        const { category, sum, comment, date } = editingExpense;

        if (!category || !sum || comment === undefined || !date) return;

        actions.addExpense(category, sum, comment, date);

        actions.setPage(Page.Balance);
    }

    render() {
        const { categories, editingExpense } = this.props;
        const { category, sum, comment, date } = editingExpense;
        console.log('AddExpense', this.props)

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
                <View style={styles.navigationBar}>
                    <TouchableOpacity style={styles.backButton} onPress={this.back}>
                        <Text style={styles.backButtonText}>Назад</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={this.submit}>
                        <Text style={styles.submitButtonText}>Готово</Text>
                    </TouchableOpacity>
                </View>

                {category &&
                    <View style={styles.addExpenseForm}>
                        <TouchableOpacity style={[styles.field, styles.category, {backgroundColor: category.color}]} onPress={this.clearCategory}>
                            <Text style={styles.categoryText}>{category.name}</Text>
                            <Text style={[styles.categoryText, styles.arrow]}>{'>'}</Text>
                        </TouchableOpacity>


                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={sum ? sum.toString() : ''}
                                onChangeText={this.onChangeSum}
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
                                onChangeText={text => this.setState({comment: text})}
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

                {!category &&
                    <View style={styles.categoriesList}>
                        <CategoriesList categories={categories.expenses} onPressCategory={this.selectCategory} />
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
    navigationBar: {
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
        paddingTop: styleConstants.MENU_PADDING,
        height: styleConstants.NAVIGATION_BAR_HEIGHT,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
    },
    button: {
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    backButton: {
        marginTop: 10,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    backButtonText: {
        color: WHITE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
    },
    submitButton: {
        position: 'absolute',
        top: styleConstants.MENU_PADDING + 10,
        right: styleConstants.BASE_HORIZONTAL_PADDING,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    submitButtonText: {
        color: WHITE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
        textAlign: 'right',
    },
    categoriesList: {
        position: 'absolute',
        top: CONTENT_TOP,
        width: window.width,
        height: CONTENT_HEIGHT,
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
    categories: state.categories,
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
