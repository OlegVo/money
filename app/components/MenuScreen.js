import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';

const window = Dimensions.get('window');

class MenuScreen extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    state = {
        items: [
            {text: 'Баланс'},
            {text: 'План на месяц'},
            {text: 'Анализ'},
        ]
    };

    onPress() {
        const { actions } = this.props;
        actions.changePage('balance');
    }

    render() {
        const { items } = this.state;

        return (
            <View style={styles.menu}>
                {items.map((item, i) => (
                    <TouchableHighlight key={i} underlayColor='rgba(0, 0, 0, .04)' onPress={this.onPress}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.text}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        paddingTop: styleConstants.MENU_PADDING + 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#1a97cb',
        paddingHorizontal: 20,
    },
    item: {
        width: window.width,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 22,
        color: '#fff',
    }
});

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(MenuScreen);
