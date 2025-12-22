
export interface buscarMedidorClienteI {
    _id:string
    numeroMedidor: string,
    direccion: string,
    estado: string
    lecturas: LecturasPagoI[]
}


interface LecturasPagoI {
    _id: string;
    codigo: string;
    numeroLectura: number;
    mes: string;
    lecturaActual: number;
    lecturaAnterior: number;
    consumoTotal: number;
    costoApagar: number;
    gestion: string;
    estado: string;
    medidor: string;
    usuario: string;
    flag: string;
    fechaVencimiento: Date;
    fecha: Date;
}