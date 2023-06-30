import { ClienteDto } from "src/aplicacion/cliente/consulta/dto/cliente.dto";
import { ClienteEntidad } from "src/infraestructura/cliente/entidad/cliente.entidad";

export abstract class DaoCliente {
    abstract listar(): Promise<ClienteDto[]>;
    abstract consultarCliente(cedula: string): Promise<ClienteEntidad>;
}