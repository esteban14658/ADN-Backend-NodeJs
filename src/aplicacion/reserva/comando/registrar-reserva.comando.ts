import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsObject } from "class-validator";
import { ClienteDto } from "src/aplicacion/cliente/consulta/dto/cliente.dto";

export class ComandoRegistrarReserva {

    @IsDate()
    @ApiProperty({ example: new Date().toISOString })
    fechaInicio: Date;

    @IsDate()
    @ApiProperty({ example: new Date().setHours(new Date().getHours() + 1) })
    fechaFin: Date;

    @IsObject()
    @ApiProperty({ example: { id: 1,
        cedula: '20798887',
        nombre: 'Esteban',
        apellidos: 'Beltran Abello',
        telefono: '3213545487',
        email: 'esteban.b@gmail.com'}})
    cliente: ClienteDto;
}