import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as styleConstants from '../constants/styles';
import { ICategory } from '../interfaces';

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
            <TouchableOpacity style={styles.category} onPress={this.onPress}>
                <View style={[styles.categoryColor, {backgroundColor: category.color}]} />

                <Text style={styles.text}>{category.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        paddingVertical: 15,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,

        flexDirection: 'row',
        minHeight: 20,
    },

    categoryColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
    },
    text: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
    },
});
