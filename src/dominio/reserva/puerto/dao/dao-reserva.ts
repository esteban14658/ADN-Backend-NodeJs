import { ReservaDto } from "src/aplicacion/reserva/consulta/dto/reserva.dto";

export abstract class DaoReserva {
    abstract listar(): Promise<ReservaDto[]>;
    abstract existeReserva(_fechaInicio: Date, _fechaFin: Date): Promise<Boolean>;
    abstract existeReservaPorId(id: number): Promise<Boolean>;
}