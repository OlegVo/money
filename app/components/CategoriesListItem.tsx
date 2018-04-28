import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ICategory } from '../interfaces';
import { ListItem } from './common/ListItem';
import * as styleConstants from '../constants/styles';

interface IProps {
    category: ICategory;
    onPress: (category: ICategory) => void;
}

export class CategoriesListItem extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const { category, onPress } = this.props;
        onPress(category);
    }

    render() {
        const { category } = this.props;

        return (
            <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
                <ListItem text={category.name} circleColor={category.color} />
            </TouchableOpacity>
        );
    }
}
