import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as styleConstants from '../constants/styles';
import { fonts, WHITE_FONT_COLOR } from '../constants/styles';
import { IActions } from '../actions';
const window = Dimensions.get('window');

export interface IButton {
    text: string;
    onPress: () => void;
}
interface IProps {
    back?: () => void;
    rightButton?: IButton;
    actions: IActions;
}

export class NavigationBar extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
    }

    back() {
        const { back, actions } = this.props;

        if (back) {
            back();
        } else {
            actions.popPage();
        }
    }

    render() {
        const { rightButton } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={this.back}>
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>

                {rightButton &&
                    <TouchableOpacity style={styles.submitButton} onPress={rightButton.onPress}>
                        <Text style={styles.submitButtonText}>{rightButton.text}</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: window.width,
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
        paddingTop: styleConstants.MENU_PADDING,
        height: styleConstants.NAVIGATION_BAR_HEIGHT,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
    },
    button: {
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    backButton: {
        marginTop: 10,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    backButtonText: {
        ...fonts.base,
        color: WHITE_FONT_COLOR,
    },
    submitButton: {
        position: 'absolute',
        top: styleConstants.MENU_PADDING + 10,
        right: styleConstants.BASE_HORIZONTAL_PADDING,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    submitButtonText: {
        ...fonts.base,
        color: WHITE_FONT_COLOR,
        textAlign: 'right',
    },
});
