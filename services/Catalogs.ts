import Http from "./Http";
import Session from "./Session";
import Utils from "./Utils";

const Catalogs = {
    getCatalog: async (catalog: string, params?: any) => {
        const sessionData = await Session.getSessionData();
        const payload: { [key: string]: any } = {};

        if (params) {
            for (const key in params) {
                const value = Utils.getNestedData(params[key], sessionData);
                payload[key] = value;
    
                if (!value) {
                    payload[key] = params[key];
                }
            }
        }

        const response = await Http.get(`${catalog}`, payload);
        return response.data;
    },
    getMaterias: async () => {
        return await Catalogs.getCatalog('/clases');
    },
    getAvisos: async () => {
        return await Catalogs.getCatalog('/avisos');
    },
    getCalificaciones: async () => {
        return await Catalogs.getCatalog('/calificaciones', { idEstudiante: 'id' });
    },
};

export default Catalogs;