import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";
import { createStubObj } from "test/util/create-object.stub";
import { SinonStubbedInstance } from 'sinon';
import { Reserva } from "src/dominio/reserva/modelo/reserva";
import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";
import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";

describe('ServicioRegistrarReserva', () => {
    let servicioRegistrarReserva: ServicioRegistrarReserva;
    let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;
    let daoReservaStub: SinonStubbedInstance<DaoReserva>;

    beforeEach(() => {

        repositorioReservaStub = createStubObj<RepositorioReserva>(['guardar']);
        daoReservaStub = createStubObj<DaoReserva>(['existeReserva']);
        servicioRegistrarReserva = new ServicioRegistrarReserva(repositorioReservaStub, daoReservaStub);
    });

    it('si la reserva no existe, guarda el Reserva en el repositorio', async () => {
        const cliente = new Cliente('1234568', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');
        const horas = 2;
        const reserva = new Reserva(new Date(), new Date(), cliente);
        
        await daoReservaStub.existeReserva.returns(Promise.resolve(false));
        await servicioRegistrarReserva.ejecutar(reserva, horas);
    
        expect(repositorioReservaStub.guardar.getCalls().length).toBe(1);
        expect(repositorioReservaStub.guardar.calledWith(reserva)).toBeTruthy();
    });

/*    it('deberia fallar si se escoge un horario fuera que no este entre las 5 y 22 horas', async () => {
        const cliente = new Cliente('1234568', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');
        const horas = 2;
        const fechaInicio = new Date();
        fechaInicio.setHours(23);
        const reserva = new Reserva(fechaInicio, new Date(), cliente);
        
        await daoReservaStub.existeReserva.returns(Promise.resolve(false));

        expect(async () => {
            await servicioRegistrarReserva.ejecutar(reserva, horas);
        }).toThrow(new ErrorDeNegocio('Horas fuera del rango permitido'));
    });*/
});