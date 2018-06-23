import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as styleConstants from '../../constants/styles';
import { fonts } from '../../constants/styles';

interface IProps {
    text: string;
}

export class ListSectionTitle extends React.PureComponent<IProps> {
    render() {
        const { text } = this.props;

        return (
            <View style={styles.root}>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: styleConstants.GRAY_BACKGROUND_COLOR,
        paddingVertical: 6,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    text: {
        ...fonts.base,
    },
});
