export interface FormularioRango {
    nombre:string
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}

export interface TarifaI {
  nombre: string;
  rango: RangoI[];
}

 interface RangoI {
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}