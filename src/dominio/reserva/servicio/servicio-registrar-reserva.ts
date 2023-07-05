import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";
import { Reserva } from "../modelo/reserva";
import { DaoReserva } from "../puerto/dao/dao-reserva";
import { RepositorioReserva } from "../puerto/repositorio/repositorio-reserva";
import * as moment from 'moment';

export class ServicioRegistrarReserva {
    constructor(private _repositorioReserva: RepositorioReserva, 
                private _daoReserva: DaoReserva) {}

    async ejecutar(reserva: Reserva, horas: number){
        reserva.fechaFin = this.sumarHoras(reserva.fechaInicio, horas);
        await this.existeReservaFuncion(reserva.fechaInicio, reserva.fechaFin);
        await this._repositorioReserva.guardarNativo(reserva);
    }

    private sumarHoras(fechaInicio: Date, horas: number): Date {
        const fechaMoment = moment(fechaInicio);
        fechaMoment.add(horas, 'hours');
        fechaMoment.subtract(1, 'seconds');
        return fechaMoment.toDate();
    }

    private async existeReservaFuncion(_fechaInicio: Date, _fechaFin: Date) {
        const existe = await this._daoReserva.existeReserva(_fechaInicio, _fechaFin);
        if(existe){
            throw new ErrorDeNegocio(
                'La fecha que selecciono ya se encuentra reservada'
            )
        }
    }
}