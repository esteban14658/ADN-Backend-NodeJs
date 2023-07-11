import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Param, Delete } from "@nestjs/common";
import { ManejadorEliminarReserva } from "src/aplicacion/reserva/comando/eliminar-reserva.manejador";
import { ComandoRegistrarReserva } from "src/aplicacion/reserva/comando/registrar-reserva.comando";
import { ManejadorRegistrarReserva } from "src/aplicacion/reserva/comando/registrar-reserva.manejador";
import { ReservaDto } from "src/aplicacion/reserva/consulta/dto/reserva.dto";
import { ManejadorListarReserva } from "src/aplicacion/reserva/consulta/listar-reservas.manejador";

@Controller('reservas')
export class ReservaControlador {
    constructor(private _manejadorRegistrarReserva: ManejadorRegistrarReserva, 
                private _manejadorListarReserva: ManejadorListarReserva, 
                private _manejadorEliminarReserva: ManejadorEliminarReserva) { }
    
    @Post('/:horas')
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarReserva: ComandoRegistrarReserva, @Param('horas') horas: number) {
        await this._manejadorRegistrarReserva.ejecutar(comandoRegistrarReserva, horas);
    }

    @Get()
    async listar(): Promise<ReservaDto[]>{
        return this._manejadorListarReserva.ejecutar();
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number) {
        await this._manejadorEliminarReserva.ejecutar(id);
    }
}