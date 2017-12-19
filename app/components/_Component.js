import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import * as styleConstants from '../constants/styles';

interface IProps {

}

export default class Component extends React.PureComponent<IProps, {}> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
    },
});
