import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";
import { DaoClienteMysql } from "../../adaptador/dao/dao-cliente-mysql";

export const daoClienteProvider = {
    provide: DaoCliente,
    useClass: DaoClienteMysql
};