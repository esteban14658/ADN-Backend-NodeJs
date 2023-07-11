import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";
import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ServicioEliminarReserva } from "src/dominio/reserva/servicio/servicio-eliminar-reserva";

export function servicioEliminarReservaProveedor(repositorioReserva: RepositorioReserva, daoReserva: DaoReserva) {
    return new ServicioEliminarReserva(repositorioReserva, daoReserva);
}