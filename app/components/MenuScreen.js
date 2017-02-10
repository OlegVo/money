import React, { Component } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');

export default class MenuScreen extends Component {
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
        const { changePage } = this.props;
        changePage('balance');
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
        marginTop: 30,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    item: {
        width: window.width,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 22,
    }
});
