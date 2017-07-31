import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';

class Container extends React.Component<any, {}> {
    static propTypes = {
    };

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

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Container);
