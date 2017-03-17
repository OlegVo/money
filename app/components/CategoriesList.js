import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import * as styleConstants from '../constants/styles';

export default class CategoriesList extends Component {
    static propTypes = {
        onPressCategory: PropTypes.func.isRequired,
    };

    render() {
        const { categories } = this.props;

        return (
            <View style={styles.container}>
                {categories.map((category, i) => (
                    <TouchableOpacity key={i} style={styles.category} onPress={() => this.props.onPressCategory(category)}>
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
        backgroundColor: '#1a97cb',
    },
    category: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    categoryText: {
        fontSize: 22,
        color: '#fff',
    },
});
