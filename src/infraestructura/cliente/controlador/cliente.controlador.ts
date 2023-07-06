import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ManejadorActualizarCliente } from "src/aplicacion/cliente/comando/actualizar-cliente.manejador";
import { ComandoRegistrarCliente } from "src/aplicacion/cliente/comando/registrar-cliente.comando";
import { ManejadorRegistrarCliente } from "src/aplicacion/cliente/comando/registrar-cliente.manejador";
import { ClienteDto } from "src/aplicacion/cliente/consulta/dto/cliente.dto";
import { ManejadorListarCliente } from "src/aplicacion/cliente/consulta/listar-clientes.manejador";

@Controller('clientes')
export class ClienteControlador {
    constructor(
        private readonly _manejadorRegistrarCliente: ManejadorRegistrarCliente,
        private readonly _manejadorListarCliente: ManejadorListarCliente,
        private readonly _manjadorActualizarCliente: ManejadorActualizarCliente
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarCliente: ComandoRegistrarCliente) {
        await this._manejadorRegistrarCliente.ejecutar(comandoRegistrarCliente);
    }

    @Get()
    async listar(): Promise<ClienteDto[]>{
        return this._manejadorListarCliente.ejecutar();
    }

    @Put('/:idCliente')
    async actualizar(@Body() comandoRegistrarCliente: ComandoRegistrarCliente, @Param('idCliente') idCliente: number) {
        await this._manjadorActualizarCliente.ejecutar(comandoRegistrarCliente, idCliente);
    }
}