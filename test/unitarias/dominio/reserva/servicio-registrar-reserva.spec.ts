import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";
import { createStubObj } from "test/util/create-object.stub";
import { SinonStubbedInstance } from 'sinon';
import { Reserva } from "src/dominio/reserva/modelo/reserva";
import { Cliente } from "src/dominio/cliente/modelo/cliente";

describe('ServicioRegistrarReserva', () => {
    let servicioRegistrarReserva: ServicioRegistrarReserva;
    let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;

    beforeEach(() => {

        repositorioReservaStub = createStubObj<RepositorioReserva>(['guardar']);
        servicioRegistrarReserva = new ServicioRegistrarReserva(repositorioReservaStub);
    });

    it('si la cedula no existe guarda el Reserva en el repositorio', async () => {
        const cliente = new Cliente('1234567', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');
        const reserva = new Reserva(new Date(), new Date(), cliente);
    
        await servicioRegistrarReserva.ejecutar(reserva);
    
        expect(repositorioReservaStub.guardar.getCalls().length).toBe(1);
        expect(repositorioReservaStub.guardar.calledWith(Reserva)).toBeTruthy();
    });
});