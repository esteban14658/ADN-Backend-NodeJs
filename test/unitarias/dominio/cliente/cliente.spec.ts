import { Cliente } from "src/dominio/cliente/modelo/cliente";
import { ErrorLongitudInvalida } from "src/dominio/errores/error-longitud-invalida";

describe('Cliente', () => {
    const _Cliente = Cliente as any;

    it('cliente con cedula menor a 6 digitos o mayor a 10 digitos deberia retornar error', () => {
        return expect(async () => new _Cliente('12345', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com'))
            .rejects
            .toStrictEqual(new ErrorLongitudInvalida('El tamaño de la cedula debe tener entre 6 y 10 caracteres'));
    });

    it('Cliente con cedula mayor o igual a 6 debería y menor o igual a 10 deberia crear bien', () => {
        const cliente = new _Cliente('1234567', 'Juan', 'Perez', '3205514645', 'juan.10@gmail.com');

        expect(cliente.cedula).toEqual('1234567');
        expect(cliente.nombre).toEqual('Juan');
        expect(cliente.apellidos).toEqual('Perez');
        expect(cliente.telefono).toEqual('3205514645');
        expect(cliente.email).toEqual('juan.10@gmail.com');
    });
});