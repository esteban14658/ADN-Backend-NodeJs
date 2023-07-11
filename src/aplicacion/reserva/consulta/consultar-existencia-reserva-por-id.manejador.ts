import { Injectable } from "@nestjs/common";
import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";

@Injectable()
export class ManejadorConsultarExistenciaPorId {
    constructor(private _daoReserva: DaoReserva) {}

    async ejecutar(id: number): Promise<Boolean> {
        return this._daoReserva.existeReservaPorId(id);
    }
}