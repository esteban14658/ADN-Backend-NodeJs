import { Module } from "@nestjs/common";
import { ReservaControlador } from "./controlador/reserva.controlador";

@Module({
    imports: [

    ], 
    controllers: [ReservaControlador],
})
export class ReservaModule { }