export interface IMateria {
    id: string;
    materia: string;
    calificacion: number;
    horario: string;
    aula: string;
    dia: string;
    imagen: string;
    profesor: IProfesor;
}

export interface IProfesor {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
}

export interface IGrupo {
    id: string;
    nombre: string;
    cuatrimestre: string;
    ciclo: string;
    profesor: IProfesor;
}

export interface IAviso {
    id: string
    tipo: number;
    titulo: string;
    descripcion: string;
    fechaPublicacion: string;
}

export interface IEstudiante {
    nombre: string;
    apellidos: string;
    correo: string;
    contrasenia: string;
    idGrupo: string;
    fechaNacimiento: string;
    genero: string;
    numeroEmergencia: string;
    matricula: string;
    alergias: string[];
    tipoSangre: string;
    telefono: string;
    turno: string;
}

export interface ICalificacion {
    id: string;
    idEstudiante: string;
    idClase: string;
    calificacion: number;
    unidad: string;
    comentarios: string;
    estudiante: IEstudiante[];
    clase: IMateria[];
}