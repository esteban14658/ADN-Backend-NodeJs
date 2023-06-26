import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorFechaReserva extends ErrorDeNegocio {
    constructor(mensaje: string) {
        super(mensaje, ErrorFechaReserva.name);
    }
}