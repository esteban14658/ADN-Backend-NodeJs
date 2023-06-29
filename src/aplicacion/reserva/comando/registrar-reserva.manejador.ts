import { Injectable } from "@nestjs/common";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";
import { ComandoRegistrarReserva } from "./registrar-reserva.comando";
import { Reserva } from "src/dominio/reserva/modelo/reserva";
import { Cliente } from "src/dominio/cliente/modelo/cliente";

@Injectable()
export class ManejadorRegistrarReserva {
    constructor(private _servicioRegistrarReserva: ServicioRegistrarReserva) {}
    
    async ejecutar(comandoRegistrarReserva: ComandoRegistrarReserva, horas: number){
        await this._servicioRegistrarReserva.ejecutar(
            new Reserva(
                comandoRegistrarReserva.fechaInicio,
                new Date(),
                new Cliente(
                    comandoRegistrarReserva.cliente.cedula,
                    comandoRegistrarReserva.cliente.nombre,
                    comandoRegistrarReserva.cliente.apellidos,
                    comandoRegistrarReserva.cliente.telefono,
                    comandoRegistrarReserva.cliente.email
                )
            ), horas
        );
    }
}