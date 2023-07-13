import { Injectable } from "@nestjs/common";
import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";

@Injectable()
export class ManejadorConsultarExistenciaClientePorId {
    constructor(private _daoCliente: DaoCliente) {}

    async ejecutar(_id: number): Promise<Boolean> {
        return this._daoCliente.existeClientePorId(_id);
    }
}