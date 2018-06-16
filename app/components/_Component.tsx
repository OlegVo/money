import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface IProps {
    balance: number;
}

export class Component extends React.PureComponent<IProps> {
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
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
