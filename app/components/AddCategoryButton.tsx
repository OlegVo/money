import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as styleConstants from '../constants/styles';
import { ListItem } from './common/ListItem';
import { IActions } from '../actions';

// const window = Dimensions.get('window');

interface IProps {
    actions: IActions;
}

export class AddCategoryButton extends React.PureComponent<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
                    <ListItem text='Добавить категорию' />
                </TouchableOpacity>
            </View>
        );
    }

    onPress = () => {
        console.log('onPress');
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // width: window.width,
        // backgroundColor: '#fff',
    },
});
