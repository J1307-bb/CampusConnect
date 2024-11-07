import Http from "./Http";
import Session from "./Session";
import Utils from "./Utils";

const Catalogs = {
    getCatalog: async (catalog: string, params: any) => {
        const sessionData = await Session.getSessionData();
        const payload: { [key: string]: any } = {};

        for (const key in params) {
            const value = Utils.getNestedData(sessionData, params[key]);
            payload[key] = value;
        }

        const response = await Http.get(`${catalog}`, { });
        return response.data;
    },
    getMaterias: async () => {
        return await Catalogs.getCatalog('/clases', {
            'id': 'idClase.id'
        });
    }
};

export default Catalogs;