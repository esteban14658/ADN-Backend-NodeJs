import { Cliente } from "../modelo/cliente";
import { RepositorioCliente } from "../puerto/repositorio/repositorio-cliente";

export class ServicioRegistrarCliente {
    constructor(private _repositorioCliente: RepositorioCliente) {}

    async ejecutar(cliente: Cliente){
        await this._repositorioCliente.guardar(cliente);
    }
}