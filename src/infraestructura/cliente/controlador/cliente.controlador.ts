import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ComandoRegistrarCliente } from "src/aplicacion/cliente/comando/registrar-cliente.comando";
import { ManejadorRegistrarCliente } from "src/aplicacion/cliente/comando/registrar-cliente.manejador";
import { ClienteDto } from "src/aplicacion/cliente/consulta/dto/cliente.dto";
import { ManejadorListarCliente } from "src/aplicacion/cliente/consulta/listar-clientes.manejador";

@Controller('clientes')
export class ClienteControlador {
    constructor(
        private readonly _manejadorRegistrarCliente: ManejadorRegistrarCliente,
        private readonly _manejadorListarClente: ManejadorListarCliente
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarCliente: ComandoRegistrarCliente) {
        await this._manejadorRegistrarCliente.ejecutar(comandoRegistrarCliente);
    }

    @Get()
    async listar(): Promise<ClienteDto[]>{
        return this._manejadorListarClente.ejecutar();
    }
}