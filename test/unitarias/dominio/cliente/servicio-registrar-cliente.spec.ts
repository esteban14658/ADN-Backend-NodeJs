import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { ServicioRegistrarCliente } from "src/dominio/cliente/servicio/servicio-registrar-cliente";
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from "test/util/create-object.stub";
import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";

describe('ServicioRegistrarCliente', () => {
    let servicioRegistrarCliente: ServicioRegistrarCliente;
    let repositorioClienteStub: SinonStubbedInstance<RepositorioCliente>;
    let daoClienteStub: SinonStubbedInstance<DaoCliente>;

    beforeEach(() => {
        repositorioClienteStub = createStubObj<RepositorioCliente>(['guardar']);
        daoClienteStub = createStubObj<DaoCliente>(['existeCliente']);
        servicioRegistrarCliente = new ServicioRegistrarCliente(repositorioClienteStub);
    });

    it('si la cedula no existe guarda el cliente en el repositorio', async () => {
        const cliente = new Cliente('1234567', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');
        daoClienteStub.existeCliente.returns(Promise.resolve(false));
    
        await servicioRegistrarCliente.ejecutar(cliente);
    
        expect(repositorioClienteStub.guardar.getCalls().length).toBe(1);
        expect(repositorioClienteStub.guardar.calledWith(cliente)).toBeTruthy();
    });
});