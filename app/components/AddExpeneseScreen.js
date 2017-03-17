import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';
import moment from 'moment';

import CategoriesList from './CategoriesList';

class AddExpenceScreen extends Component {
    static propTypes = {
        categories: PropTypes.shape({
            expenses: PropTypes.array.isRequired,
        }).isRequired,
        currency: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearCategory = this.clearCategory.bind(this);
        this.onPriceKeyPress = this.onPriceKeyPress.bind(this);
        this.submit = this.submit.bind(this);
    }

    state = {
        category: null,
        sum: '0',
        comment: '',
        date: new Date(),
    };

    back() {
        this.props.actions.changePage('balance');
    }

    selectCategory(category) {
        this.setState({category});
    }

    clearCategory() {
        this.setState({category: null});
    }

    onPriceKeyPress(event) {
        const key = event.nativeEvent.key;

        let sum = this.state.sum;
        if (key == 'Backspace') {
            if (sum > 0) {
                sum = sum.slice(0, sum.length - 1);
                if (sum.length == 0) {
                    sum = '0';
                }

                this.setState({sum});
            }
            return;
        }

        if (!/[0-9]/.test(key)) return;

        if (this.state.sum === '0') {
            sum = key;
        } else {
            sum += key;
        }

        this.setState({sum});
    }

    submit() {
        const { actions } = this.props;
        const { category, sum, comment, date } = this.state;

        actions.addExpence({category, sum, comment, date});

        actions.changePage('balance');
    }

    render() {
        const { categories, currency } = this.props;
        const { category, sum, comment, date } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <TouchableOpacity style={styles.backButton} onPress={this.back}>
                        <Text style={styles.backButtonText}>Назад</Text>
                    </TouchableOpacity>
                </View>

                {!category &&
                    <CategoriesList categories={categories.expenses} onPressCategory={this.selectCategory} />
                }

                {category &&
                    <View>
                        <TouchableOpacity style={styles.field} onPress={this.clearCategory}>
                            <Text style={styles.fieldText}>{category.name}</Text>
                        </TouchableOpacity>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={sum + ' ' + currency}
                                onKeyPress={this.onPriceKeyPress}
                                autoFocus={true}
                                selectionColor='#fff'
                                keyboardType='numeric'
                            />
                        </View>

                        <View style={styles.field}>
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={text => this.setState({comment: text})}
                                selectionColor='#fff'
                                placeholder='Примечание'
                                placeholderTextColor='#bbb'
                                returnKeyType='done'
                                onSubmitEditing={this.submit}
                            />
                        </View>

                        <View style={styles.dateButtonWrapper}>
                            <TouchableOpacity style={styles.dateButton} onPress={() => {}}>
                                <Text style={styles.dateButtonText}>Сегодня</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={this.submit}>
                            <Text style={styles.submitButtonText}>Готово</Text>
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
        backgroundColor: '#1a97cb',
        paddingTop: styleConstants.MENU_PADDING,
        paddingHorizontal: styleConstants.HORIZONTAL_PADDING,
    },
    navigationBar: {
        height: styleConstants.NAVIGATION_BAR_HEIGHT,
    },
    button: {
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: '#fff',
    },
    backButton: {
        marginTop: 10,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    submitButton: {
        marginTop: 30,
        width: 80,
        alignSelf: 'flex-end',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'right',
    },
    field: {
        width: window.width,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    fieldText: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        fontSize: 20,
        height: 40,
        color: '#fff',
    },
    dateButtonWrapper: {
        marginTop: 15,
        height: 15,
    },
    dateButton: {
        position: 'absolute',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    dateButtonText: {
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'transparent',
    }
});

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(AddExpenceScreen);
