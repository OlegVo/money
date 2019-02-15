import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import * as styleConstants from '../constants/styles';
import { ICategory } from '../types';
import { CategoriesListItem } from './CategoriesListItem';

const window = Dimensions.get('window');

interface IProps {
    categories: ICategory[];
    onPressCategory: (category: ICategory) => void;
}

export class CategoriesList extends React.PureComponent<IProps> {
    render() {
        const { categories, onPressCategory } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <ScrollView>
                        {categories.map((category, i) =>
                            <CategoriesListItem key={i} category={category} onPress={onPressCategory} />
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width,
        backgroundColor: '#fff',
    },
    list: {
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
});
