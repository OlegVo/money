import * as React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import * as styleConstants from '../constants/styles';
import { MenuItem } from './MenuItem';
import { IMenuItem, Page } from '../interfaces';
import { IActions } from '../actions';
import { WHITE_BORDER_COLOR, WHITE_FONT_COLOR } from '../constants/styles';

const window = Dimensions.get('window');

const menuItems = [
    {text: 'Расходы', icon: '\u1F4B0', page: Page.Balance},
    {text: 'План', page: Page.Planning},
    {text: 'Отчёты', page: Page.Reports},
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
        actions.setPage(item.page);
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
        borderTopWidth: 1,
        borderColor: WHITE_BORDER_COLOR,
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    item: {
        width: Math.ceil(window.width / menuItems.length),
        height: styleConstants.MENU_HEIGHT,
        // borderRightWidth: .5,
        borderColor: WHITE_BORDER_COLOR,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 60,
        color: WHITE_FONT_COLOR,
    },
});
