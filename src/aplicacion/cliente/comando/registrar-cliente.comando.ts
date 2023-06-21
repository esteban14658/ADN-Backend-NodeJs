import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class ComandoRegistrarCliente {
    @IsNumberString()
    @ApiProperty({ example: '20798887'})
    public cedula: string;

    @IsString()
    @ApiProperty({ example: 'Esteban' })
    public nombre: string;

    @IsString()
    @ApiProperty({ example: 'Beltran Abello' })
    public apellidos: string;

    @IsString()
    @ApiProperty({ example: '3209981727' })
    public telefono: string;

    @IsString()
    @ApiProperty({ example: 'esteban.b@gmail.com' })
    public email: string;
}