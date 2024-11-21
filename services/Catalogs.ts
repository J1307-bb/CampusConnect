import Http from "./Http";
import Session from "./Session";
import Utils from "./Utils";
import Notifications from "./Notifications";

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
    getGrupos: async () => {
        return await Catalogs.getCatalog('/grupos');
    },
    getMateriasProfesor: async () => {
        console.log('getMateriasProfesor');
        return await Catalogs.getCatalog('/clases', { idProfesor: 'id' });
    },
    createTask: async (opts: any) => {
        const { titulo, descripcion, fechaVencimiento, to } = opts;

        try {
            await Http.post('/tareas', { titulo, descripcion, fechaVencimiento, to });
        } catch (error) {
            console.error('Error creating task: ', error);
        }

        const message = {
            title: 'Nueva tarea',
            body: 'Tienes una nueva tarea pendiente',
        }

        Notifications.sendNofication({ to, message });
    },
    createNotice: async (opts: any) => {
        const { titulo, descripcion, to } = opts;
        try {
            await Http.post('/avisos', { titulo, descripcion, to });
        } catch (error) {
            console.error('Error creating notice: ', error);
        }

        const message = {
            title: 'Nuevo aviso',
            body: 'Tienes un nuevo aviso pendiente',
        }
        Notifications.sendNofication({ to, message });
    },
    createForm: async (opts: any) => {
        const { titulo, preguntas, to } = opts;

        try {
            await Http.post('/encuestas', { titulo, preguntas, to });
        } catch (error) {
            console.error('Error creating form: ', error);
        }

        const message = {
            title: 'Nueva encuesta',
            body: 'Tienes una nueva encuesta pendiente',
        };

        Notifications.sendNofication({ to, message });
    },
};

export default Catalogs;