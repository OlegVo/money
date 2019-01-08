import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import * as styleConstants from '../constants/styles';
import { ListItem } from './common/ListItem';
import { IActions } from '../actions';
import { Page } from '../interfaces';

interface IProps {
    actions: IActions;
}

export class AddCategoryButton extends React.PureComponent<IProps> {
    onPress = () => {
        const { actions } = this.props;
        actions.pushPage(Page.EditCategory);
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
                <ListItem text='Добавить категорию' />
            </TouchableOpacity>
        );
    }
}
