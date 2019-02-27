import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState, ICategories, ICategory, IExpenseValues, Page } from '../types';
import { IActions } from '../actions';
import { CategoriesList, NavigationBar } from '../components';
import { WideButton } from '../components/WideButton';

interface IPropsT {
    categories: ICategories;
    editingExpense: IExpenseValues;
}

type IProps = IPropsT & { actions: IActions };

class CategoriesScreen extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory(category: ICategory) {
        const { editingExpense, actions } = this.props;

        const addEditExpenseScreen = !editingExpense.category;
        actions.editExpense({ category });
        if (addEditExpenseScreen) {
            actions.pushPage(Page.EditExpense);
        } else {
            actions.popPage();
        }
    }

    addCategory = () => {
        const { actions } = this.props;
        actions.pushPage(Page.EditCategory);
    };

    render() {
        const { editingExpense, categories, actions } = this.props;

        if (!editingExpense.date) return null;

        return (
            <View style={styles.container}>
                <NavigationBar actions={actions} />

                <WideButton text='Добавить категорию' onPress={this.addCategory} actions={actions} />

                <CategoriesList categories={categories.expenses} onPressCategory={this.selectCategory} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    categories: state.categories,
    editingExpense: state.editingExpense,
});

const mapDispatchToProps = (dispatch): { actions: IActions } => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoriesScreen);
export { connected as CategoriesScreen };
