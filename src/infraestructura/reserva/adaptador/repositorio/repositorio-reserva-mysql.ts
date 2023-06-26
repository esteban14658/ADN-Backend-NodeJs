import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        private readonly daoCliente: DaoClienteMysql
    ) {}
    
    async guardar(reserva: Reserva) {
        const entidad = new ReservaEntidad();
        entidad.fechaInicio = reserva.fechaInicio;
        entidad.fechaFin = reserva.fechaFin;
        entidad.cliente.id = (await this.daoCliente.consultarCliente(reserva.cliente.cedula)).id;
        entidad.cliente.cedula = reserva.cliente.cedula;
        entidad.cliente.nombre = reserva.cliente.nombre;
        entidad.cliente.apellidos = reserva.cliente.apellidos;
        entidad.cliente.telefono = reserva.cliente.telefono;
        entidad.cliente.email = reserva.cliente.email;
        await this.repositorio.save(entidad);
    }
}