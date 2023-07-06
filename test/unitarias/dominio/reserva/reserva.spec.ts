import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { Reserva } from "src/dominio/reserva/modelo/reserva";

describe('Reserva', () => {
    const _Reserva = Reserva as any;
    const _Cliente = Cliente as any;

    it('Reserva si todos los datos estan bien, deberia crear la reserva', () => {
        const reserva = new _Reserva('2023-06-27T19:30:00.000Z', '2023-06-27T22:30:00.000Z',
            new _Cliente('1234567', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com'));
        
        expect(reserva.fechaInicio).toEqual('2023-06-27T19:30:00.000Z');
        expect(reserva.fechaFin).toEqual('2023-06-27T22:30:00.000Z');
    });
});