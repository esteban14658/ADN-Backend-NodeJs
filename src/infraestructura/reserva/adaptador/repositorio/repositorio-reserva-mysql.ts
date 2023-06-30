import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager } from 'typeorm';
import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ReservaEntidad } from "../../entidad/reserva.entidad";
import { Repository } from 'typeorm';
import { Reserva } from "src/dominio/reserva/modelo/reserva";
import { DaoClienteMysql } from "src/infraestructura/cliente/adaptador/dao/dao-cliente-mysql";

@Injectable()
export class RepositorioReservaMysql implements RepositorioReserva{
    constructor(
        @InjectRepository(ReservaEntidad)
        private readonly repositorio: Repository<ReservaEntidad>,
        private readonly daoCliente: DaoClienteMysql,
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) {}

    async guardarNativo(reserva: Reserva){
        const idCliente = (await this.daoCliente.consultarCliente(reserva.cliente.cedula)).id;
        await this.entityManager.query("INSERT INTO RESERVA (fechaInicio, fechaFin, clienteId) VALUES (?, ?, ?)", 
                                [reserva.fechaInicio, reserva.fechaFin, idCliente]);
    }
}