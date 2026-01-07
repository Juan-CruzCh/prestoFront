import { required, schema, Schema } from "@angular/forms/signals"
import { FormularioMedidorI } from "../model/medidor"

export const MedidorSchema: Schema<FormularioMedidorI> = schema((field) => {
    required(field.cliente, {
        message: "Debe seleccionar un cliente"
    }),
        required(field.descripcion, {
            message: "Debe ingresar una descripción"
        }),
        required(field.fechaInstalacion, {
            message: "Debe seleccionar la fecha de instalación"
        }),
        required(field.numeroMedidor, {
            message: "Debe ingresar el número de medidor"
        }),
        required(field.direccion, {
            message: "Debe ingresar la direccion"
        }),
        required(field.tarifa, {
            message: "Debe seleccionar una tarifa"
        })
})
