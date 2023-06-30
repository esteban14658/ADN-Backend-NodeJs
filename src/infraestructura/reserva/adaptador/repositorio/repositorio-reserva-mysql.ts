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
    
    async guardar(reserva: Reserva) {
        /*const entidad = new ReservaEntidad();
        entidad.fechaInicio = reserva.fechaInicio;
        entidad.fechaFin = reserva.fechaFin;
        console.log('[Hola]' + this.daoCliente.consultarCliente(reserva.cliente.cedula));
        entidad.cliente.id = 1;
        entidad.cliente.cedula = reserva.cliente.cedula;
        entidad.cliente.nombre = reserva.cliente.nombre;
        entidad.cliente.apellidos = reserva.cliente.apellidos;
        entidad.cliente.telefono = reserva.cliente.telefono;
        entidad.cliente.email = reserva.cliente.email;*/
        const entidad = {
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            cliente: {
                id: 1,
                cedula: reserva.cliente.cedula,
                nombre: reserva.cliente.nombre,
                apellidos: reserva.cliente.apellidos,
                telefono: reserva.cliente.telefono,
                email: reserva.cliente.email
            }
        }
        await this.repositorio.save(entidad);
    }

    async guardarNativo(reserva: Reserva){
        const idCliente = (await this.daoCliente.consultarCliente(reserva.cliente.cedula)).id;
        await this.entityManager.query("INSERT INTO RESERVA (fechaInicio, fechaFin, clienteId) VALUES (?, ?, ?)", 
                                [reserva.fechaInicio, reserva.fechaFin, idCliente]);
        console.log(this.daoCliente.consultarCliente(reserva.cliente.cedula));
    }
}