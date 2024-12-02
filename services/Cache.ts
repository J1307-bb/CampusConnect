import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from "@sentry/react-native";

import Catalogs from './Catalogs';
import Session from './Session';
const Cache = {
    catalogs: [
        {
            name: 'materias',
            accountType: 'estudiante',
            fn: Catalogs.getMaterias,
            required: true,
        },
        {
            name: 'materiasAsignadas',
            accountType: 'profesor',
            fn: Catalogs.getMateriasProfesor,
            required: true,
        },
        {
            name: 'gruposAsignados',
            accountType: 'profesor',
            fn: Catalogs.getGruposAsignados,
            required: true,
        },
        {
            name: 'estudiantesAsignados',
            accountType: 'profesor',
            fn: Catalogs.getEstudiantesAsignados,
            required: false,
        }
    ],
    getAccountTypeCatalogs: async () => {
        const { esProfesor } = await Session.getSessionData();
        return Cache.catalogs.filter((catalog) => esProfesor ? catalog.accountType === 'profesor' : catalog.accountType === 'estudiante') ?? [];
    },
    loadRequiredCatalogs: async () => {
        let catalogsToLoad = await Cache.getAccountTypeCatalogs();
        catalogsToLoad = catalogsToLoad.filter((catalog) => catalog.required);

        await Cache.loadCatalogs(catalogsToLoad);
    },
    loadNotRequiredCatalogs: async () => {
        let catalogsToLoad = await Cache.getAccountTypeCatalogs();
        catalogsToLoad = catalogsToLoad.filter((catalog) => !catalog.required);

        await Cache.loadCatalogs(catalogsToLoad);
    },
    loadCatalogs: async (catalogsToLoad: any) => {
        for (const catalog of catalogsToLoad) {
            try {
                let data = typeof catalog.fn === 'function' ? await catalog.fn() : [];
                if (data && !Array.isArray(data)) data = [data];
                await AsyncStorage.setItem(catalog.name, JSON.stringify(data));
            } catch (error) {
                Sentry.captureMessage(`Error loading catalog ${catalog.name}: ${error}`);
            }
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