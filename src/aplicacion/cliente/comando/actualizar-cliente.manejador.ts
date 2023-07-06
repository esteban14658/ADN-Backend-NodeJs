import { Injectable } from "@nestjs/common";
import { ServicioActualizarCliente } from "src/dominio/cliente/servicio/servicio-actualizar-cliente";
import { ComandoRegistrarCliente } from "./registrar-cliente.comando";
import { Cliente } from "src/dominio/cliente/modelo/cliente";

@Injectable()
export class ManejadorActualizarCliente {
    constructor(private _servicioActualizarCliente: ServicioActualizarCliente) {}

    async ejecutar(comandoRegistrarCliente: ComandoRegistrarCliente, idCliente: number) {
        await this._servicioActualizarCliente.ejecutar(
            new Cliente(
                comandoRegistrarCliente.cedula,
                comandoRegistrarCliente.nombre,
                comandoRegistrarCliente.apellidos,
                comandoRegistrarCliente.telefono,
                comandoRegistrarCliente.email
            ),
            idCliente
        )
    }
}