import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
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

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de reservas', () => {

    let app: INestApplication;
    let repositorioReserva: SinonStubbedInstance<RepositorioReserva>;
    let daoReserva: SinonStubbedInstance<DaoReserva>;

    beforeAll(async () => {
        repositorioReserva = createStubObj<RepositorioReserva>(['guardar'], sinonSandbox);
        daoReserva = createStubObj<DaoReserva>(['listar'], sinonSandbox);

        const moduleRef = await Test.createTestingModule({
            controllers: [ReservaControlador],
            providers: [
                AppLogger,
            {
            provide: ServicioRegistrarReserva,
            inject: [RepositorioReserva],
            useFactory: servicioRegistrarReservaProveedor,
            },
            { provide: RepositorioReserva, useValue: repositorioReserva },
            { provide: DaoUsuario, useValue: daoReserva },
            ManejadorRegistrarReserva,
            ManejadorListarReserva,
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
});