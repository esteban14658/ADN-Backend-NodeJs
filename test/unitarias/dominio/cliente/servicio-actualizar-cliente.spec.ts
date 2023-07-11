import { ServicioActualizarCliente } from "src/dominio/cliente/servicio/servicio-actualizar-cliente";
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from "test/util/create-object.stub";
import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";

describe('ServicioActualizarCliente', () => {
    let servicioActualizarCliente: ServicioActualizarCliente;
    let repositorioClienteStub: SinonStubbedInstance<RepositorioCliente>;
    let daoClienteStub: SinonStubbedInstance<DaoCliente>;

    beforeEach(() => {
        repositorioClienteStub = createStubObj<RepositorioCliente>(['actualizar']);
        daoClienteStub = createStubObj<DaoCliente>(['existeCliente']);
        servicioActualizarCliente = new ServicioActualizarCliente(repositorioClienteStub, daoClienteStub);
    });

    it('si se envian los datos correctamente, debe actualizar', async () => {
        const cliente = new Cliente('1234567', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');
        const idCliente = 1;

        await daoClienteStub.existeCliente.returns(Promise.resolve(true)); 
        await servicioActualizarCliente.ejecutar(cliente, idCliente);

        expect(repositorioClienteStub.actualizar.getCalls().length).toBe(1);
        expect(repositorioClienteStub.actualizar.calledWith(cliente, idCliente)).toBeTruthy();
    });
});