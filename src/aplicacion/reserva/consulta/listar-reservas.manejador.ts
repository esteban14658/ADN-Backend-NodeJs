import { Injectable } from "@nestjs/common";
import { ReservaDto } from "./dto/reserva.dto";
import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";

@Injectable()
export class ManejadorListarReserva {
    constructor(private _daoReserva: DaoReserva) {}

    async ejecutar(): Promise<ReservaDto[]> {
        return this._daoReserva.listar();
    }
}