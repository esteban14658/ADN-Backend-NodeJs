import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { RepositorioClienteMysql } from "../../adaptador/repositorio/repositorio-cliente-mysql";

export const repositorioUsuarioProvider = {
    provide: RepositorioCliente,
    useClass: RepositorioClienteMysql
    };