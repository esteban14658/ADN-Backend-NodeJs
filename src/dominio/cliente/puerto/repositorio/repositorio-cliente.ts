import { Cliente } from "../../modelo/cliente";

export abstract class RepositorioCliente {
    abstract guardar(cliente: Cliente);
}