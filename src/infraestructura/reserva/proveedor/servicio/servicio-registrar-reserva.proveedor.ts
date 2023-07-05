import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";
import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";

export function servicioRegistrarReservaProveedor(repositorioReserva: RepositorioReserva, daoReserva: DaoReserva) {
    return new ServicioRegistrarReserva(repositorioReserva, daoReserva);
}