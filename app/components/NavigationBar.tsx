import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as styleConstants from '../constants/styles';
import { WHITE_FONT_COLOR } from '../constants/styles';
import { IActions } from '../actions';
const window = Dimensions.get('window');

interface IProps {
    back?: () => void;
    submit?: () => void;
    actions: IActions;
}

export class NavigationBar extends React.PureComponent<IProps, {}> {
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
        const { submit } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={this.back}>
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>

                {submit &&
                    <TouchableOpacity style={styles.submitButton} onPress={submit}>
                        <Text style={styles.submitButtonText}>Готово</Text>
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
        color: WHITE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
    },
    submitButton: {
        position: 'absolute',
        top: styleConstants.MENU_PADDING + 10,
        right: styleConstants.BASE_HORIZONTAL_PADDING,
        height: styleConstants.TOP_BUTTON_HEIGHT,
        width: 80,
    },
    submitButtonText: {
        color: WHITE_FONT_COLOR,
        fontSize: styleConstants.BASE_FONT_SIZE,
        textAlign: 'right',
    },
});
