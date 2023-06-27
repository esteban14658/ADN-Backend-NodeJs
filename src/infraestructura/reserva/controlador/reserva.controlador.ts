import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { ComandoRegistrarReserva } from "src/aplicacion/reserva/comando/registrar-reserva.comando";
import { ManejadorRegistrarReserva } from "src/aplicacion/reserva/comando/registrar-reserva.manejador";
import { ReservaDto } from "src/aplicacion/reserva/consulta/dto/reserva.dto";
import { ManejadorListarReserva } from "src/aplicacion/reserva/consulta/listar-reservas.manejador";

@Controller('reservas')
export class ReservaControlador {
    constructor(private _manejadorRegistrarReserva: ManejadorRegistrarReserva, 
                private _manejadorListarReserva: ManejadorListarReserva) { }
    
    @Post()
//    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarReserva: ComandoRegistrarReserva) {
        await this._manejadorRegistrarReserva.ejecutar(comandoRegistrarReserva);
    }

    @Get()
    async listar(): Promise<ReservaDto[]>{
        return this._manejadorListarReserva.ejecutar();
    }
}