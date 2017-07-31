import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import * as styleConstants from '../constants/styles';

const window = Dimensions.get('window');

const HORIZONTAL_PADDING = 10;
const ITEM_SIZE = 60;
const HORIZONTAL_MARGIN = Math.floor(((window.width - HORIZONTAL_PADDING*2) / 3 - ITEM_SIZE) / 2);

export class CategoriesList extends React.Component<any, {}> {
    // static propTypes = {
    //     onPressCategory: PropTypes.func.isRequired,
    // };

    render() {
        const { categories } = this.props;

        return (
            <View style={styles.container}>
                {categories.map((category, i) => (
                    <TouchableOpacity key={i} style={styles.category} onPress={() => this.props.onPressCategory(category)}>
                        <View style={[styles.categoryIcon, {backgroundColor: category.color}]}>
                            <Text style={styles.categoryIconText}>{category.name.slice(0, 1)}</Text>
                        </View>

                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: window.width,
        backgroundColor: '#fff',
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingTop: 20,
    },
    category: {
        width: ITEM_SIZE + HORIZONTAL_MARGIN * 2,
        height: ITEM_SIZE + 34,
    },
    categoryIcon: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: ITEM_SIZE/2,
        marginHorizontal: HORIZONTAL_MARGIN,
        marginBottom: 6,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    categoryIconText: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
        lineHeight: ITEM_SIZE,
    },
    categoryText: {
        textAlign: 'center',
        fontSize: 12,
        color: styleConstants.BASE_FONT_COLOR,
    },
});
