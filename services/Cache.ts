import Catalogs from './Catalogs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cache = {
    catalogs: [
        {
            name: 'materias',
            path: Catalogs.getMaterias
        }
    ],
    loadCatalogs: async () => {
        for (const catalog of Cache.catalogs) {
            const data = await catalog.path();
            await AsyncStorage.setItem(catalog.name, JSON.stringify(data));
        }
    },
    getData: async (catalogName: string) => {
        const data = await AsyncStorage.getItem(catalogName) ?? '[]';
        return JSON.parse(data);
    },
    clearCache: async () => {
        await AsyncStorage.clear();
    }
};

export default Cache;