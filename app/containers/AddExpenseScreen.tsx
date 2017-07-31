import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import * as moment from 'moment';

const window = Dimensions.get('window');

import { CategoriesList, DatePicker } from '../components';

const CONTENT_TOP = styleConstants.NAVIGATION_BAR_HEIGHT;
const CONTENT_HEIGHT = window.height - CONTENT_TOP - styleConstants.MENU_HEIGHT;

class AddExpenseScreen extends React.Component<any, any> {
    // static propTypes = {
    //     categories: PropTypes.shape({
    //         expenses: PropTypes.array.isRequired,
    //     }).isRequired,
    //     actions: PropTypes.object.isRequired,
    // };

    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearCategory = this.clearCategory.bind(this);
        this.onSelectDate = this.onSelectDate.bind(this);
        this.onChangeSum = this.onChangeSum.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            category: null,
            sum: '',
            comment: '',
            date: moment().format(formats.DATE_FORMAT),
            selectDate: false,
        };
    }

    back() {
        this.props.actions.changePage('balance');
    }

    selectCategory(category) {
        this.setState({category});
    }

    clearCategory() {
        this.setState({category: null});
    }

    onSelectDate(date) {
        this.setState({date: date.format(formats.DATE_FORMAT)});
        this.setState({selectDate: false});
    }

    onChangeSum(value) {
        const sum = value.replace(/\D/g, '');
        this.setState({sum});
    }

    submit() {
        const { actions } = this.props;
        const { category, sum, comment, date } = this.state;

        actions.addExpense({category, sum, comment, date});

        actions.changePage('balance');
    }

    render() {
        const { categories } = this.props;
        const { category, sum, comment, date, selectDate } = this.state;

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

                {category && !selectDate &&
                    <View style={styles.addExpenseForm}>
                        <TouchableOpacity style={[styles.field, styles.category, {backgroundColor: category.color}]} onPress={this.clearCategory}>
                            <Text style={styles.categoryText}>{category.name}</Text>
                            <Text style={[styles.categoryText, styles.arrow]}>{'>'}</Text>
                        </TouchableOpacity>


                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={sum}
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
                                placeholder='Примечание'
                                placeholderTextColor={styleConstants.GRAY_FONT_COLOR}
                                returnKeyType='done'
                                onSubmitEditing={this.submit}
                            />
                        </View>

                        <TouchableOpacity style={[styles.field, styles.date]} onPress={() => this.setState({selectDate: true})}>
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

                {selectDate &&
                    <View style={styles.datePicker}>
                        <DatePicker date={date} onSelectDate={this.onSelectDate} />
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
        color: '#fff',
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
        color: '#fff',
        fontSize: styleConstants.BASE_FONT_SIZE,
        textAlign: 'right',
    },
    categoriesList: {
        position: 'absolute',
        top: CONTENT_TOP,
        width: window.width,
        height: CONTENT_HEIGHT,
    },
    datePicker: {
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
        color: '#fff',
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
    }
});

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(AddExpenseScreen);
export { connected as AddExpenseScreen };
