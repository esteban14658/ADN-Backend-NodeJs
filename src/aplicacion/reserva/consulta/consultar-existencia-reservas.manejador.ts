import { Injectable } from "@nestjs/common";
import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";

@Injectable()
export class ManejadorConsultarExistenciaReserva {
    constructor(private _daoReserva: DaoReserva) {}

    async ejecutar(_fechaInicio: Date, _fechaFin: Date): Promise<Boolean> {
        return this._daoReserva.existeReserva(_fechaInicio, _fechaFin);
    }
}