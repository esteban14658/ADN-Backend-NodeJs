import { Reserva } from "../../modelo/reserva";

export abstract class RepositorioReserva {
    abstract guardarNativo(reserva: Reserva);
}