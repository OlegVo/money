import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';

class PlanningScreen extends React.Component<any, {}> {
    // static propTypes = {
    //     balance: PropTypes.number.isRequired,
    //     currency: PropTypes.string.isRequired,
    //     actions: PropTypes.object.isRequired,
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>План на месяц</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(PlanningScreen);
export { connected as PlanningScreen };
