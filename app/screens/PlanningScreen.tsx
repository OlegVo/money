import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import { IAppState } from '../types';
import { IActions } from '../actions';
import {
    BASE_HORIZONTAL_PADDING, fonts,
    MENU_PADDING
} from '../constants/styles';

interface IPropsT {
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class PlanningScreen extends React.PureComponent<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.caption}>TODO Планирование</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: MENU_PADDING,
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
    },
    caption: {
        ...fonts.base,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    currency: state.currency,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanningScreen);
export { connected as PlanningScreen };
