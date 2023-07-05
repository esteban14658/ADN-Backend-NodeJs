import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaEntidad } from '../../entidad/reserva.entidad';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

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
        const contarFechaInicio = await this.entityManager.count(ReservaEntidad, {
            fechaInicio: MoreThanOrEqual(_fechaInicio),
            fechaFin: LessThanOrEqual(_fechaFin),
        });
        console.log('[contarFechaInicio] = ' + contarFechaInicio);
        const contarFechaFin = await this.entityManager.count(ReservaEntidad, {
            fechaInicio: MoreThanOrEqual(_fechaFin),
            fechaFin: LessThanOrEqual(_fechaInicio),
        });
        console.log('[contarFechaFin] = ' + contarFechaFin);
        if (contarFechaInicio > 0 || contarFechaFin > 0){
            return true;
        }
        return false;
    }
}