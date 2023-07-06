import { Injectable } from "@nestjs/common";
import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";

@Injectable()
export class ManejadorConsultarExistenciaCliente {
    constructor(private _daoCliente: DaoCliente) {}

    async ejecutar(_cedula: string): Promise<Boolean> {
        return this._daoCliente.existeCliente(_cedula);
    }
}