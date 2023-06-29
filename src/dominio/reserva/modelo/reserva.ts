import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { ErrorFechaReserva } from "src/dominio/errores/error-fecha-reserva";

export class Reserva {
    readonly #fechaInicio: Date;
    #fechaFin: Date;
    readonly #cliente: Cliente;

    constructor(fechaInicio: Date, fechaFin: Date, cliente: Cliente) {
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.#cliente = cliente;
    }

    private validarFecha(fechaInicio: Date, fechaFin: Date){
        if (fechaInicio > fechaFin){
            throw new ErrorFechaReserva(
                `La fecha de inicio debe ser menor a la fecha fin de la reserva`,
            )
        }
    }

    get fechaInicio(): Date {
        return this.#fechaInicio;
    }

    get fechaFin(): Date {
        return this.#fechaFin;
    }

    set fechaFin(fechaFin: Date){
        this.#fechaFin = fechaFin;
    }

    get cliente(): Cliente {
        return this.#cliente;
    }
}