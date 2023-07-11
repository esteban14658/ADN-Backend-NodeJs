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

    async existeReserva(_fechaInicio: Date, _fechaFin: Date): Promise<Boolean> {
        const resultado = await this.entityManager.query(
            `SELECT COUNT(*)
            FROM RESERVA
            WHERE ? BETWEEN fechaInicio AND fechaFin
            OR ? BETWEEN fechaInicio AND fechaFin`,
            [_fechaInicio, _fechaFin]
        )
        const count = parseInt(resultado[0]['COUNT(*)']);
        return count > 0;
    }

    async existeReservaPorId(id: number): Promise<Boolean> {
        const resultado = await this.entityManager.query(
            `SELECT COUNT(*)
            FROM RESERVA
            WHERE id = ?`,
            [id]
        )
        const count = parseInt(resultado[0]['COUNT(*)']);
        return count > 0;
    }
}