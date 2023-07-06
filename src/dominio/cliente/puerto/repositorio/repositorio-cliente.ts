import { Cliente } from "../../modelo/cliente";

export abstract class RepositorioCliente {
    abstract guardar(cliente: Cliente);
    abstract actualizar(cliente: Cliente, idCliente: number);
}