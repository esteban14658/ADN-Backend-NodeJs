import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaControlador } from 'src/infraestructura/reserva/controlador/reserva.controlador';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { servicioRegistrarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-registrar-reserva.proveedor';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comando/registrar-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reservas.manejador';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ComandoRegistrarCliente } from 'src/aplicacion/cliente/comando/registrar-cliente.comando';
import { ComandoRegistrarReserva } from 'src/aplicacion/reserva/comando/registrar-reserva.comando';
import { ManejadorEliminarReserva } from 'src/aplicacion/reserva/comando/eliminar-reserva.manejador';
import { ManejadorConsultarExistenciaPorId } from 'src/aplicacion/reserva/consulta/consultar-existencia-reserva-por-id.manejador';
import { ManejadorConsultarExistenciaReserva } from 'src/aplicacion/reserva/consulta/consultar-existencia-reservas.manejador';
import { ServicioEliminarReserva } from 'src/dominio/reserva/servicio/servicio-eliminar-reserva';
import { servicioEliminarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-eliminar-reserva.proveedor';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de reservas', () => {

    let app: INestApplication;
    let repositorioReserva: SinonStubbedInstance<RepositorioReserva>;
    let daoReserva: SinonStubbedInstance<DaoReserva>;

    beforeAll(async () => {
        repositorioReserva = createStubObj<RepositorioReserva>(['guardar', 'eliminar'], sinonSandbox);
        daoReserva = createStubObj<DaoReserva>(['listar', 'existeReserva', 'existeReservaPorId'], sinonSandbox);

        const moduleRef = await Test.createTestingModule({
            controllers: [ReservaControlador],
            providers: [
                AppLogger,
            {
                provide: ServicioRegistrarReserva,
                inject: [RepositorioReserva, DaoReserva],
                useFactory: servicioRegistrarReservaProveedor,
            },
            {
                provide: ServicioEliminarReserva,
                inject: [RepositorioReserva, DaoReserva],
                useFactory: servicioEliminarReservaProveedor,
            },
            { provide: RepositorioReserva, useValue: repositorioReserva },
            { provide: DaoReserva, useValue: daoReserva },
            ManejadorRegistrarReserva,
            ManejadorListarReserva,
            ManejadorEliminarReserva,
            ManejadorConsultarExistenciaPorId,
            ManejadorConsultarExistenciaReserva
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        const logger = await app.resolve(AppLogger);
        logger.customError = sinonSandbox.stub();
        app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
        await app.init();
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    afterAll(async () => {
        await app.close();
    });

    it('debería listar las reservas registradas', () => {

        const cliente: any = {
            cedula: '1234567',
            nombre: 'Juan',
            apellidos: 'Perez',
            telefono: '3205514645',
            email: 'juan.10@gmail.com'
        }
        const reservas: any[] = [{ fechaInicio: (new Date().toISOString()), fechaFin: (new Date().toISOString()), 
                                    cliente }];
        daoReserva.listar.returns(Promise.resolve(reservas));
    
        return request(app.getHttpServer())
            .get('/reservas')
            .expect(HttpStatus.OK)
            .expect(reservas);
    });

    it('debería fallar al registar una reseva ya existente', async () => {
        const cliente: ComandoRegistrarCliente = {
            cedula: '1234567',
            nombre: 'Juan',
            apellidos: 'Perez',
            telefono: '3205514645',
            email: 'juan.10@gmail.com'
        }

        const reserva: ComandoRegistrarReserva = {
            fechaInicio: (new Date()).toISOString(),
            cliente: cliente
        }

        const horas = 2;

        const mensaje = 'La fecha que selecciono ya se encuentra reservada';
        daoReserva.existeReserva.returns(Promise.resolve(true));
    
        const response = await request(app.getHttpServer())
            .post(`/reservas/${horas}`).send(reserva)
            .expect(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toBe(mensaje);
        expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('deberia fallar al eliminar una reserva que no existe', async () => {
        const id = 1;

        const mensaje = 'No se encuentra la reserva registrada';
        daoReserva.existeReservaPorId.returns(Promise.resolve(false));

        const response = await request(app.getHttpServer())
            .delete(`/reservas/${id}`)
            .expect(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toBe(mensaje);
        expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
});