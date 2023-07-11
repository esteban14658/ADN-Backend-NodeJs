import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";
import { Cliente } from "../modelo/cliente";
import { DaoCliente } from "../puerto/dao/dao-cliente";
import { RepositorioCliente } from "../puerto/repositorio/repositorio-cliente";

export class ServicioActualizarCliente {
    constructor(private _repositorioCliente: RepositorioCliente, 
                private _daoCliente: DaoCliente) {}

    async ejecutar(cliente: Cliente, idCliente: number){
        await this.validarExistenciaCliente(cliente.cedula);
        await this._repositorioCliente.actualizar(cliente, idCliente);
    }

    private async validarExistenciaCliente(cedula: string){
        const existe = await this._daoCliente.existeCliente(cedula);
        if (!existe) {
            throw new ErrorDeNegocio(
                'No se encuentra registrado el cliente con dicha cedula'
            )
        }
    }
}