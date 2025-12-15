export interface BuscarMedidorClienteI {
    apellidos?: string;
    estado?: string;
    lecturaActual?: number;
    lecturaAnterior?: number;
    medidor?: string;
    nombre?: string;
    numeroMedidor?: string;

}


export interface FormularioLecturaI {
    lecturaActual: number;
    lecturaAnterior: number;
    medidor: string
    gestion: string
    mes: string,

}


export interface listarLecturasI {
    codigo: string;
    mes: string;
    lecturaActual: number;
    lecturaAnterior: number;
    consumoTotal: number
    costoApagar: number,
    estado: string

}
