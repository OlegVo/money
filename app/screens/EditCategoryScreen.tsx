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
import { makeCategory } from '../helpers/categories';

interface IPropsT {
    editingExpense: IExpenseValues; // TODO
}

interface IState {
    categoryName: string;
}

type IProps = IPropsT & { actions: IActions };

class EditCategoryScreen extends React.PureComponent<IProps, IState> {
    state: IState = {
        categoryName: '',
    };

    back = () => {
        const { actions } = this.props;
        actions.popPage();
    };

    onChangeName = (value: string) => {
        this.setState({ categoryName: value });
    };

    addCategory = () => {
        const { actions } = this.props;
        actions.addCategory(makeCategory({ name: this.state.categoryName }));
        actions.popPage();
    };

    render() {
        const { actions } = this.props;
        const { categoryName } = this.state;

        const rightButton: IButton | undefined = categoryName ? { text: 'Готово', onPress: this.addCategory } : undefined;

        return (
            <View style={styles.container}>
                <NavigationBar back={this.back} rightButton={rightButton} actions={actions} />

                <View style={styles.form}>
                    <View style={styles.field}>
                        <TextInput
                            style={[styles.input, styles.nameInput]}
                            autoFocus={true}
                            value={categoryName}
                            onChangeText={this.onChangeName}
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
    // TODO вынести куда-то и переиспользовать? Или сделать компоненты формы и полей
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
