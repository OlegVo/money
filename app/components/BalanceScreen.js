import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class BalanceScreen extends Component {
    static propTypes = {
    };

    render() {
        const { balance } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Text style={styles.balanceText}>{balance}</Text>
                </View>

                <TouchableOpacity>
                    <View style={styles.addExpenceButton}>
                        <Text style={styles.addExpenceButtonText}>-</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a97cb',
    },
    balance: {

    },
    balanceText: {
        fontSize: 28,
    },
    addExpenceButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
    },
    addExpenceButtonText: {
        fontSize: 28,
    }
});
