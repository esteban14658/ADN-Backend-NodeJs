import { Injectable } from "@nestjs/common";
import { ServicioRegistrarCliente } from "src/dominio/cliente/servicio/servicio-registrar-cliente";
import { ComandoRegistrarCliente } from "./registrar-cliente.comando";
import { Cliente } from "src/dominio/cliente/modelo/cliente";

@Injectable()
export class ManejadorRegistrarCliente {
    constructor(private _servicioRegistrarCliente: ServicioRegistrarCliente) {}

    async ejecutar(comandoRegistrarCliente: ComandoRegistrarCliente){
        await this._servicioRegistrarCliente.ejecutar(
            new Cliente(
                comandoRegistrarCliente.cedula,
                comandoRegistrarCliente.nombre,
                comandoRegistrarCliente.apellidos,
                comandoRegistrarCliente.telefono,
                comandoRegistrarCliente.email
            )
        );
    }
}