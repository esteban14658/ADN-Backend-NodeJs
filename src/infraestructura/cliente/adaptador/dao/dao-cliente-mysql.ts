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

  async consultarCliente(cedula: string): Promise<ClienteEntidad>{
      const query = `
      SELECT c.*
      FROM CLIENTE c
      WHERE c.cedula = $1
    `;
    const cliente = await this.entityManager.query(query, [cedula]);
    return plainToClass(ClienteEntidad, cliente[0]);
  }
}
