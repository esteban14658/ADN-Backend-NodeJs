import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";
import { DaoReserva } from "../puerto/dao/dao-reserva";
import { RepositorioReserva } from "../puerto/repositorio/repositorio-reserva";

export class ServicioEliminarReserva {
    constructor(private _repositorioReserva: RepositorioReserva, 
        private _daoReserva: DaoReserva) {}

    async ejecutar(id: number) {
        await this.validarExistenciaReserva(id);
        await this._repositorioReserva.eliminar(id);
    }

    private async validarExistenciaReserva(id: number){
        const existe = await this._daoReserva.existeReservaPorId(id);
        if (!existe) {
            throw new ErrorDeNegocio(
                'No se encuentra la reserva registrada'
            )
        }
    }
}