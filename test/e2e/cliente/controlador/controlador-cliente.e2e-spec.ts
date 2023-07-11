import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioCliente } from 'src/dominio/cliente/puerto/repositorio/repositorio-cliente';
import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { ClienteControlador } from 'src/infraestructura/cliente/controlador/cliente.controlador';
import { ServicioRegistrarCliente } from 'src/dominio/cliente/servicio/servicio-registrar-cliente';
import { servicioRegistrarClienteProveedor } from 'src/infraestructura/cliente/proveedor/servicio/servicio-registrar-cliente.proveedor';
import { ServicioActualizarCliente } from 'src/dominio/cliente/servicio/servicio-actualizar-cliente';
import { servicioActualizarClienteProveedor } from 'src/infraestructura/cliente/proveedor/servicio/servicio-actualizar-cliente-proveedor';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ManejadorRegistrarCliente } from 'src/aplicacion/cliente/comando/registrar-cliente.manejador';
import { ManejadorActualizarCliente } from 'src/aplicacion/cliente/comando/actualizar-cliente.manejador';
import { ManejadorListarCliente } from 'src/aplicacion/cliente/consulta/listar-clientes.manejador';
import { ManejadorConsultarExistenciaCliente } from 'src/aplicacion/cliente/consulta/consultar-existencia-cliente.manejador';
import { async } from 'rxjs';
import { ComandoRegistrarCliente } from 'src/aplicacion/cliente/comando/registrar-cliente.comando';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de clientes', () => {

    let app: INestApplication;
    let repositorioCliente: SinonStubbedInstance<RepositorioCliente>;
    let daoCliente: SinonStubbedInstance<DaoCliente>;

    beforeAll(async () => {
        repositorioCliente = createStubObj<RepositorioCliente>(['guardar', 'actualizar'], sinonSandbox);
        daoCliente = createStubObj<DaoCliente>(['listar', 'consultarCliente', 'existeCliente'], sinonSandbox);
        const moduleRef = await Test.createTestingModule({
            controllers: [ClienteControlador],
            providers: [
                AppLogger,
                {
                    provide: ServicioRegistrarCliente,
                    inject: [RepositorioCliente],
                    useFactory: servicioRegistrarClienteProveedor,
                },
                {
                    provide: ServicioActualizarCliente,
                    inject: [RepositorioCliente, DaoCliente],
                    useFactory: servicioActualizarClienteProveedor
                },
                { provide: RepositorioCliente, useValue: repositorioCliente },
                { provide: DaoCliente, useValue: daoCliente },
                ManejadorRegistrarCliente,
                ManejadorActualizarCliente,
                ManejadorListarCliente,
                ManejadorConsultarExistenciaCliente
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

    it('deberia listar los clientes registrados', () => {
        const clientes: any[] = [{
            id: 1,
            cedula: '1234567',
            nombre: 'Juanito',
            apellidos: 'Alvarez',
            telefono: '3215548787',
            email: 'juan.1@gmail.com'
        }];
        daoCliente.listar.returns(Promise.resolve(clientes));

        return request(app.getHttpServer())
        .get('/clientes')
        .expect(HttpStatus.OK)
        .expect(clientes);
    });

    it('deberia fallar si la cedula es menor de 6 caracteres o mayor a 10', async () => {
        const cliente: ComandoRegistrarCliente = {
            cedula: '12345',
            nombre: 'Juanito',
            apellidos: 'Alvarez',
            telefono: '3215548787',
            email: 'juan.1@gmail.com'
        };
        const mensaje = 'El tamaño de la cedula debe tener entre 6 y 10 caracteres';

        const response = await request(app.getHttpServer())
            .post('/clientes').send(cliente)
            .expect(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toBe(mensaje);
        expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('deberia fallar al intentar actualizar un cliente que no existe', async () => {
        const id = 10;
        const cliente: ComandoRegistrarCliente = {
            cedula: '987876352',
            nombre: 'Daniel',
            apellidos: 'Acosta',
            telefono: '3008276262',
            email: 'acosta.1@gmail.com'
        };

        const mensaje = 'No se encuentra registrado el cliente con dicha cedula';
        daoCliente.existeCliente.returns(Promise.resolve(false));

        const response = await request(app.getHttpServer())
            .put(`/clientes/${id}`).send(cliente)
            .expect(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toBe(mensaje);
        expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
});