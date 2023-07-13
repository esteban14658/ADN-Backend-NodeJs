import { Cliente } from "../modelo/cliente";
import { DaoCliente } from "../puerto/dao/dao-cliente";
import { RepositorioCliente } from "../puerto/repositorio/repositorio-cliente";
import { ErrorRecursoNoEncontrado } from "src/dominio/errores/error-recurso-no-encontrado";

export class ServicioActualizarCliente {
    constructor(private _repositorioCliente: RepositorioCliente, 
                private _daoCliente: DaoCliente) {}

    async ejecutar(cliente: Cliente, idCliente: number){
        await this.validarExistenciaCliente(idCliente);
        await this._repositorioCliente.actualizar(cliente, idCliente);
    }

    private async validarExistenciaCliente(idCliente: number){
        const existe = await this._daoCliente.existeClientePorId(idCliente);
        if (!existe) {
            throw new ErrorRecursoNoEncontrado(
                'No se encuentra registrado el cliente con dicho id'
            )
        }
    }
}