import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as styleConstants from '../../constants/styles';
import { fonts } from '../../constants/styles';

interface IProps {
    text: string;
    circleColor?: string;
}

export class ListItem extends React.PureComponent<IProps> {
    render() {
        const { text, circleColor, children } = this.props;

        return (
            <View style={styles.listItem}>
                {circleColor &&
                    <View style={[styles.circle, {backgroundColor: circleColor}]} />
                }

                <Text style={styles.text}>{text}</Text>

                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: styleConstants.LIST_VERTICAL_PADDING,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,

        flexDirection: 'row',
        minHeight: 20,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
    },
    text: {
        ...fonts.base,
    },
});
