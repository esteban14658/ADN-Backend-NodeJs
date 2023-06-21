import { ApiProperty } from '@nestjs/swagger';

export class ClienteDto {

    @ApiProperty({ example: '20798887' })
    cedula: string;

    @ApiProperty({ example: 'Esteban' })
    nombre: string;

    @ApiProperty({ example: 'Beltran Abello' })
    apellidos: string;

    @ApiProperty({ example: '3209981727' })
    telefono: string;

    @ApiProperty({ example: 'esteban.b@gmail.com' })
    email: string;
}