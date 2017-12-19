import * as React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import * as styleConstants from '../constants/styles';
import { MenuItem } from './MenuItem';
import { IMenuItem, Page } from '../interfaces';
import { IActions } from '../actions';

const window = Dimensions.get('window');

const menuItems = [
    {text: 'Баланс', icon: '\u1F4B0', page: Page.Balance},
    {text: 'Расходы', page: Page.Expenses},
    {text: 'План', page: Page.Planning},
    {text: 'Графики', page: Page.Planning},
];

interface IProps {
    actions: IActions;
}

interface IState {
    items: IMenuItem[];
}

export class Menu extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);

        this.state = {
            items: menuItems,
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

export const styles = StyleSheet.create({
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
