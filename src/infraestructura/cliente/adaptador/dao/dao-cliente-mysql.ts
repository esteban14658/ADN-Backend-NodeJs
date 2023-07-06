import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';
import { plainToClass } from 'class-transformer';
import { ClienteEntidad } from '../../entidad/cliente.entidad';

@Injectable()
export class DaoClienteMysql implements DaoCliente {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<ClienteDto[]> {
    return this.entityManager.query(
      'SELECT c.* FROM CLIENTE c',
    );
  }

  async consultarCliente(_cedula: string): Promise<ClienteEntidad> {
    const cliente = await this.entityManager.findOne(ClienteEntidad, { where: { cedula: _cedula } });
    return plainToClass(ClienteEntidad, cliente);
  }

  async existeCliente(_cedula: string): Promise<Boolean> {
    const contarClientes = await this.entityManager.count(ClienteEntidad, { where: { cedula: _cedula } });
    return contarClientes > 0;
  }
}
