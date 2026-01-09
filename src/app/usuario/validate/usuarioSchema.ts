import { required, schema, Schema } from "@angular/forms/signals";
import {  UpdateUsuarioI, UsuarioCrearI } from "../model/usuario";


export const usuarioSchema: Schema<UsuarioCrearI> = schema((field) => {

    required(field.ci, { message: "El CI es obligatorio" })
    required(field.nombre, { message: "El nombre es obligatorio" })
    required(field.apellidoPaterno, { message: "El apellido paterno es obligatorio" })
    required(field.apellidoMaterno, { message: "El apellido materno es obligatorio" })
    required(field.celular, { message: "El celular es obligatorio" })
    required(field.direccion, { message: "La dirección es obligatoria" })
    required(field.usuario, { message: "El usuario es obligatorio" })
    required(field.password, { message: "La contraseña es obligatoria" })
    required(field.rol, { message: "El rol es obligatorio" })

})



export const updateusuarioSchema: Schema<UpdateUsuarioI> = schema((field) => {

    required(field.ci, { message: "El CI es obligatorio" })
    required(field.nombre, { message: "El nombre es obligatorio" })
    required(field.apellidoPaterno, { message: "El apellido paterno es obligatorio" })
    required(field.apellidoMaterno, { message: "El apellido materno es obligatorio" })
    required(field.celular, { message: "El celular es obligatorio" })
    required(field.direccion, { message: "La dirección es obligatoria" })
    required(field.usuario, { message: "El usuario es obligatorio" })
    required(field.rol, { message: "El rol es obligatorio" })

})