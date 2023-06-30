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
    console.log('[impresion cedula]' + _cedula);
    const cliente = await this.entityManager.findOne(ClienteEntidad, { where: { cedula: _cedula } });
    console.log('[Cliente]: ' + cliente);
    return plainToClass(ClienteEntidad, cliente);
  }
}
