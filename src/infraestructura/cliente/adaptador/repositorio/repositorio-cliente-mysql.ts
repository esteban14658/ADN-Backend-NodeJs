import { Injectable } from "@nestjs/common";
import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { ClienteEntidad } from "../../entidad/cliente.entidad";
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { Repository } from 'typeorm';

@Injectable()
export class RepositorioClienteMysql implements RepositorioCliente{
    constructor(
        @InjectRepository(ClienteEntidad)
        private readonly repositorio: Repository<ClienteEntidad>,
    ) {}

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