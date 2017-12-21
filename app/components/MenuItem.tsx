import * as React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { IMenuItem } from '../interfaces';
import { styles } from './Menu';

interface IProps {
    item: IMenuItem;
    onPress: (item: IMenuItem) => void;
}

export class MenuItem extends React.PureComponent<IProps, {}> {
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
