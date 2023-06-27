import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { RepositorioReservaMysql } from "../../adaptador/repositorio/repositorio-reserva-mysql";

export const repositorioReservaProvider = {
    provide: RepositorioReserva,
    useClass: RepositorioReservaMysql
}