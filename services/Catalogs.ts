import Http from "./Http";
import Session from "./Session";
import Utils from "./Utils";
import Notifications from "./Notifications";
import Cache from "./Cache";

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
        return await Catalogs.getCatalog('/clases/recibidas');
    },
    getAvisos: async () => {
        return await Catalogs.getCatalog('/avisos');
    },
    getCalificacionesRecibidas: async () => {
        return await Catalogs.getCatalog('/calificaciones/recibidas');
    },
    getGrupos: async () => {
        return await Catalogs.getCatalog('/grupos');
    },
    getMateriasProfesor: async () => {
        return await Catalogs.getCatalog('/clases/asignadas');
    },
    getGruposAsignados: async () => {
        return await Catalogs.getCatalog('/grupos/asignados');
    },
    getEstudiantesAsignados: async () => {
        return await Catalogs.getCatalog('/estudiantes/asignados');
    },
    getEstudiantesGrupo: async (idGrupo: string) => {
        const estudiantes = await Cache.getData('estudiantesAsignados');
        return estudiantes.filter((estudiante: any) => estudiante.idGrupo === idGrupo);
    },
    getTareasCreadas: async () => {
        return await Catalogs.getCatalog('/tareas/creadas');
    },
    getEncuestasCreadas: async () => {
        return await Catalogs.getCatalog('/encuestas/creadas');
    },
    getAvisosCreados: async () => {
        return await Catalogs.getCatalog('/avisos/creadas');
    },
    postTareas: async (opts: any) => {
        const { titulo, descripcion, idMateria, fechaVencimiento, to, idProfesor } = opts;

        //TODO: crear select de materias para asignar tarea en el dashboard de profesores
        try {
            const { data } = await Http.post('/tareas', { titulo, descripcion, fechaVencimiento, to, idMateria, idProfesor });
            await Catalogs.updateLastTaskAssigned(data.id, idMateria);
        } catch (error) {
            console.error('Error creating task: ', error);
        }

        const message = {
            title: 'Campus Connect',
            body: 'Tienes una nueva tarea pendiente: {titulo}',
            data: {
                titulo,
                url: '/(tabs)'
            }
        }

        await Notifications.sendNofication({ to, message });
    },
    updateLastTaskAssigned: async (idTarea: string, idMateria: string) => {
        if(!idMateria) return;

        await Http.put(`/materias/${idMateria}`, { idTarea });
    },
    postAviso: async (opts: any) => {
        const { titulo, descripcion, to, idProfesor } = opts;
        try {
            await Http.post('/avisos', { titulo, descripcion, to, idProfesor });
        } catch (error) {
            console.error('Error creating notice: ', error);
        }

        const message = {
            title: 'Campus Connect',
            body: 'Tienes un nuevo aviso pendiente: {titulo}',
            data: {
                titulo,
                url: '/(tabs)'
            }
        }
        await Notifications.sendNofication({ to, message });
    },
    postEncuesta: async (opts: any) => {
        const { titulo, preguntas, to, idProfesor } = opts;

        try {
            await Http.post('/encuestas', { titulo, preguntas, to, idProfesor });
        } catch (error) {
            console.error('Error creating form: ', error);
        }

        const message = {
            title: 'Campus Connect',
            body: 'Tienes una nueva encuesta pendiente: {titulo}',
            data: {
                titulo,
                url: '/calificacion'
            }
        };

        await Notifications.sendNofication({ to, message });
    },
};

export default Catalogs;