import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as styleConstants from '../constants/styles';
import { IActions } from '../actions';
import { wideButton } from '../constants/styles';
import { fonts } from '../constants/styles';

interface IProps {
    text: string;
    onPress: () => void;
    actions: IActions;
}

export class WideButton extends React.PureComponent<IProps> {
    render() {
        const { text, onPress } = this.props;

        return (
            <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.textWrap}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: styleConstants.LIST_VERTICAL_PADDING,
        paddingHorizontal: wideButton.horizontalPadding,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
        minHeight: 20,
    },
    textWrap: {
        backgroundColor: 'transparent',
        paddingLeft: 7,
    },
    text: {
        ...fonts.base,
        color: wideButton.textColor,
    },
});
