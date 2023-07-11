import { Reserva } from "../../modelo/reserva";

export abstract class RepositorioReserva {
    abstract guardar(reserva: Reserva);
    abstract eliminar(id: number);
}