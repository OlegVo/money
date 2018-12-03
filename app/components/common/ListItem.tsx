import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as styleConstants from '../../constants/styles';
import { fonts } from '../../constants/styles';

const window = Dimensions.get('window');

interface IProps {
    text: string;
    circleColor?: string;
    lineColor?: string;
    lineWidth?: number;
}

export class ListItem extends React.PureComponent<IProps> {
    render() {
        const { text, circleColor, lineColor, lineWidth, children } = this.props;

        let width = 0;
        if (lineWidth) {
            width = Math.ceil((window.width - 2 * styleConstants.BASE_HORIZONTAL_PADDING) * lineWidth / 100);
        }

        return (
            <View style={styles.listItem}>
                {circleColor &&
                    <View style={[styles.circle, {backgroundColor: circleColor}]} />
                }

                {!!lineColor && !!lineWidth &&
                    <View style={[styles.line, {backgroundColor: lineColor, width}]} />
                }

                <View style={styles.textWrap}>
                    <Text style={styles.text}>{text}</Text>
                </View>

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

        position: 'relative',
        marginRight: 7,
    },
    line: {
        position: 'absolute',
        left: styleConstants.BASE_HORIZONTAL_PADDING,
        top: 10,
        width: 5,
        height: 30,
        borderRadius: 3,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
    },
    textWrap: {
        backgroundColor: 'transparent',
        paddingLeft: 7,
    },
    text: {
        ...fonts.base,
    },
});
