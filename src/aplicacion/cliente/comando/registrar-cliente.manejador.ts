import { Injectable } from "@nestjs/common";
import { ServicioRegistrarCliente } from "src/dominio/cliente/servicio/servicio-registrar-cliente";

@Injectable()
export class ManejadorRegistrarCliente {
    constructor(private _servicioRegistrarCliente: ServicioRegistrarCliente) {}
}