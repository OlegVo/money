import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';

class PlanningScreen extends Component {
    static propTypes = {
        balance: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { actions } = this.props;

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

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(PlanningScreen);
