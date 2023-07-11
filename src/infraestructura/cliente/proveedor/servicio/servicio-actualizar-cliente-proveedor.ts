import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";
import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { ServicioActualizarCliente } from "src/dominio/cliente/servicio/servicio-actualizar-cliente";

export function servicioActualizarClienteProveedor(repositorioCliente: RepositorioCliente, daoCliente: DaoCliente){
    return new ServicioActualizarCliente(repositorioCliente, daoCliente);
}