import { Injectable } from "@nestjs/common";
import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { ClienteEntidad } from "../../entidad/cliente.entidad";
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class RepositorioClienteMysql implements RepositorioCliente{
    constructor(
        @InjectRepository(ClienteEntidad)
        private readonly repositorio: Repository<ClienteEntidad>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) {}

    async actualizar(cliente: Cliente, idCliente: number) {
        await this.entityManager.query(
            `UPDATE CLIENTE
            SET nombre = ?, 
            apellidos = ?,
            telefono = ?, 
            email = ?
            WHERE id = ?`,
            [cliente.nombre, cliente.apellidos, cliente.telefono, cliente.email, idCliente]
        )
    }

    async guardar(cliente: Cliente) {
        const entidad = new ClienteEntidad();
        entidad.cedula = cliente.cedula;
        entidad.nombre = cliente.nombre;
        entidad.apellidos = cliente.apellidos;
        entidad.telefono = cliente.telefono;
        entidad.email = cliente.email;
        await this.repositorio.save(entidad);
    }
}