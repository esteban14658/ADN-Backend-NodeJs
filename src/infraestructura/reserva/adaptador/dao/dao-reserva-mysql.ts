import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';


@Injectable()
export class DaoReservaMysql implements DaoReserva {
    constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    ) {}

    async listar(): Promise<ReservaDto[]> {
    return this.entityManager.query(
        'SELECT r.* FROM RESERVA r',
    );
    }
}