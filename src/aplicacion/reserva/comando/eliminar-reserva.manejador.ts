import { Injectable } from "@nestjs/common";
import { ServicioEliminarReserva } from "src/dominio/reserva/servicio/servicio-eliminar-reserva";

@Injectable()
export class ManejadorEliminarReserva {

    constructor(private _servicioEliminarReserva: ServicioEliminarReserva) {}

    async ejecutar(id: number){
        await this._servicioEliminarReserva.ejecutar(id);
    }
}