import * as React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import * as styleConstants from '../constants/styles';

const window = Dimensions.get('window');

const menuItems = [
    {text: 'Баланс', icon: '\u1F4B0', page: 'balance'},
    {text: 'Расходы', page: 'expenses'},
    {text: 'План', page: 'planning'},
    {text: 'Графики', page: 'planning'},
];

export class Menu extends React.Component<any, any> {
    // static propTypes = {
    //     actions: PropTypes.object.isRequired,
    // };

    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);

        this.state = {
            items: menuItems
        };
    }

    onPress(item) {
        const { actions } = this.props;
        actions.changePage(item.page);
    }

    render() {
        const { items } = this.state;

        return (
            <View style={styles.menu}>
                {items.map((item, i) => <MenuItem key={i} item={item} onPress={this.onPress} />)}
            </View>
        );
    }
}

class MenuItem extends React.Component<any, {}> {
    // static propTypes = {
    //     item: PropTypes.object.isRequired,
    //     onPress: PropTypes.func.isRequired,
    // };

    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress(this.props.item);
    }

    render() {
        const { text } = this.props.item;

        return (
            <TouchableHighlight underlayColor='rgba(0, 0, 0, .04)' onPress={this.onPress}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        bottom: 0,
        width: window.width,
        height: styleConstants.MENU_HEIGHT,
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#fff',
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
    },
    item: {
        width: Math.ceil(window.width / menuItems.length),
        height: styleConstants.MENU_HEIGHT,
        borderRightWidth: .5,
        borderColor: '#fff',
    },
    itemText: {
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 60,
        color: '#fff',
    }
});
