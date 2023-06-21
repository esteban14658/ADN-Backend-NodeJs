import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CLIENTE' })
export class ClienteEntidad{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cedula: string;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column()
    telefono: string;

    @Column()
    email: string;
}