import * as React from 'react';
import { StyleSheet, View, Text, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { fonts, list } from '../../constants/styles';

interface IProps {
    height: number;
    color?: string;
    left?: boolean;
    onPress?: () => void;
}

export class Arrow extends React.PureComponent<IProps> {
    render() {
        const { height, color, left, onPress } = this.props;

        const arrowStyle = [s.arrow, left ? s.left : s.right];

        const arrowTextStyle: StyleProp<TextStyle> = [s.arrowText, { lineHeight: height }];
        if (color) {
            arrowTextStyle.push({ color });
        }

        const text = <Text style={arrowTextStyle}>{left ? '<' : '>'}</Text>;

        if (onPress) {
            return (
                <TouchableOpacity style={arrowStyle} onPress={onPress}>
                    {text}
                </TouchableOpacity>
            );
        }

        return <View style={arrowStyle}>{text}</View>;
    }
}

const s = StyleSheet.create({
    arrow: {
        position: 'absolute',
        paddingHorizontal: list.arrow.horizontalPadding,
    },
    left: {
        left: 0,
    },
    right: {
        right: 0,
    },
    arrowText: {
        ...fonts.base,
    },
});
