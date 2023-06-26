import { Injectable } from "@nestjs/common";
import { DaoReserva } from "src/infraestructura/reserva/proveedor/dao/dao-reserva";
import { ReservaDto } from "./dto/reserva.dto";

@Injectable()
export class ManejadorListarReserva {
    constructor(private _daoReserva: DaoReserva) {}

    async ejecutar(): Promise<ReservaDto[]> {
        return this._daoReserva.listar();
    }
}