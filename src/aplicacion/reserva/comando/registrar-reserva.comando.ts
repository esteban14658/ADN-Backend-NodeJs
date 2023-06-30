import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsObject, IsString } from "class-validator";
import { ClienteDto } from "src/aplicacion/cliente/consulta/dto/cliente.dto";

export class ComandoRegistrarReserva {

    @IsString()
    @ApiProperty({ example: new Date().toISOString })
    fechaInicio: string;

    @IsObject()
    @ApiProperty({ example: { id: 1,
        cedula: '20798887',
        nombre: 'Esteban',
        apellidos: 'Beltran Abello',
        telefono: '3213545487',
        email: 'esteban.b@gmail.com'}})
    cliente: ClienteDto;
}