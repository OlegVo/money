import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState } from '../interfaces/index';
import { IActions } from '../actions/index';
import {
    BASE_FONT_COLOR, BASE_FONT_SIZE, BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR,
    MENU_PADDING
} from '../constants/styles';
import { addThinSpaces } from '../helpers/string';

interface IPropsT {
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class PlanningScreen extends React.PureComponent<IProps, {}> {
    render() {
        const { currency } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.caption}>Доход</Text>

                <View style={styles.sum}>
                    <Text style={styles.sumText}>{addThinSpaces(120000)}{}</Text><Text style={styles.currencyText}>{currency}</Text>
                </View>
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
        fontSize: BASE_FONT_SIZE,
        color: BASE_FONT_COLOR,
    },
    sum: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    sumText: {
        fontSize: 40,
        color: BLUE_FONT_COLOR,
    },
    currencyText: {
        fontSize: 26,
        marginBottom: 3,
        color: BLUE_FONT_COLOR,
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
