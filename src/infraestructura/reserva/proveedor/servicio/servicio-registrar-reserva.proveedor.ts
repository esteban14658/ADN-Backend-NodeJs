import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";

export function servicioRegistrarReservaProveedor(repositorioReserva: RepositorioReserva) {
    return new ServicioRegistrarReserva(repositorioReserva);
}