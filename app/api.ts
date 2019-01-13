import { ICategories } from './interfaces';
import { AsyncStorage } from 'react-native';

enum StorageKey {
    Categories = 'categories',
}

function saveCategories(categories: ICategories) {
    AsyncStorage.setItem(StorageKey.Categories, JSON.stringify(categories));

    return {
        ok: true,
    };
}

async function loadCategories(): Promise<ICategories | undefined> {
    const json = await AsyncStorage.getItem(StorageKey.Categories);
    try {
        return JSON.parse(json);
    } catch (e) {
        return {
            expenses: [],
        };
    }
}

export const api = {
    saveCategories,
    loadCategories,
};
