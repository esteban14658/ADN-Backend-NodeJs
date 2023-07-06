import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { ServicioActualizarCliente } from "src/dominio/cliente/servicio/servicio-actualizar-cliente";

export function servicioActualizarClienteProveedor(repositorioCliente: RepositorioCliente){
    return new ServicioActualizarCliente(repositorioCliente);
}