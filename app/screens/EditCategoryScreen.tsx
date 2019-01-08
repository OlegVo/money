import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { NavigationBar } from '../components';
import { IAppState, IExpenseValues } from '../interfaces';
import { IActions } from '../actions';
import { bindActionCreators } from 'redux';
import actionCreators from '../actions';
import { connect } from 'react-redux';
import { IButton } from '../components/NavigationBar';
import { BASE_HORIZONTAL_PADDING, colors, fonts, LIST_BORDER_COLOR } from '../constants/styles';

interface IPropsT {
    editingExpense: IExpenseValues; //TODO
}

type IProps = IPropsT & { actions: IActions };

class EditCategoryScreen extends React.PureComponent<IProps> {
    back = () => {
        const { actions } = this.props;
        actions.popPage();
    };

    submit = () => {
        // const { actions } = this.props;
    };

    render() {
        const { actions } = this.props;

        const rightButton: IButton = { text: 'Готово', onPress: this.submit };

        return (
            <View style={styles.container}>
                <NavigationBar back={this.back} rightButton={rightButton} actions={actions} />

                <View style={styles.form}>
                    <View style={styles.field}>
                        <TextInput
                            style={[styles.input, styles.nameInput]}
                            value=''
                            autoFocus={true}
                            selectionColor={colors.baseFont}
                            placeholder='Название'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    //TODO вынести куда-то и переиспользовать? Или сделать компоненты формы и полей
    form: {},
    field: {
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: LIST_BORDER_COLOR,
    },
    fieldText: {
        ...fonts.base,
    },
    input: {
        height: 30,
        ...fonts.base,
    },
    nameInput: {
        height: 35,
        fontSize: 22,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    editingExpense: state.editingExpense, //TODO
});

const mapDispatchToProps = (dispatch): { actions: IActions } => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditCategoryScreen);
export { connected as EditCategoryScreen };
