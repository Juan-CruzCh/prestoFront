export interface ResultadoHttp<T> {
    data: T[];
    total: number;
    paginas: number;
}