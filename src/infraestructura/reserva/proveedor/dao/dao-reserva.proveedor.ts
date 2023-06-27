import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";
import { DaoReservaMysql } from "../../adaptador/dao/dao-reserva-mysql";

export const daoReservaProvider = {
    provide: DaoReserva,
    useClass: DaoReservaMysql
}