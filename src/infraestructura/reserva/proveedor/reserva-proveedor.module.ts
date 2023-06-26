import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservaEntidad } from "../entidad/reserva.entidad";

@Module({
    imports: [TypeOrmModule.forFeature([ReservaEntidad])],
    providers: [
        
    ],
})
export class ReservaProveedorModule {}