import { Cliente } from "../modelo/cliente";
import { RepositorioCliente } from "../puerto/repositorio/repositorio-cliente";

export class ServicioActualizarCliente {
    constructor(private _repositorioCliente: RepositorioCliente) {}

    async ejecutar(cliente: Cliente, idCliente: number){
        await this._repositorioCliente.actualizar(cliente, idCliente);
    }
}