import AsyncStorage from '@react-native-async-storage/async-storage';

import Catalogs from './Catalogs';
import Session from './Session';
const Cache = {
    catalogs: [
        {
            name: 'materias',
            accountType: 'estudiante',
            path: Catalogs.getMaterias
        },
        {
            name: 'materias',
            accountType: 'profesor',
            path: Catalogs.getMateriasProfesor
        },
        {
            name: 'grupos',
            accountType: 'profesor',
            path: Catalogs.getGrupos
        },
        {
            name: 'gruposMaterias',
            accountType: 'profesor',
            path: async (): Promise<any> => {
                const grupos = await Cache.getData('grupos');
                const materias = await Cache.getData('materias');
                const gruposId = Array.from(new Set(materias.map((materia: any) => materia.idGrupo)));

                return grupos.filter((grupo: any) => gruposId.includes(grupo.id));
            }
        }
    ],
    loadCatalogs: async () => {
        const { catalogs = [] } = Cache;
        const { esProfesor } = await Session.getSessionData();

        const catalogsToLoad = catalogs.filter((catalog) => esProfesor ? catalog.accountType === 'profesor' : catalog.accountType === 'estudiante');

        for (const catalog of catalogsToLoad) {
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