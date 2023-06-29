import { Reserva } from "../modelo/reserva";
import { RepositorioReserva } from "../puerto/repositorio/repositorio-reserva";
import * as moment from 'moment';

export class ServicioRegistrarReserva {
    constructor(private _repositorioReserva: RepositorioReserva) {}

    async ejecutar(reserva: Reserva, horas: number){
        reserva.fechaFin = this.sumarHoras(reserva.fechaInicio, horas);
        await this._repositorioReserva.guardar(reserva);
    }

    private sumarHoras(fechaInicio: Date, horas: number): Date {
        const fechaMoment = moment(fechaInicio);
        fechaMoment.add(horas, 'hours');
        return fechaMoment.toDate();
    }
}