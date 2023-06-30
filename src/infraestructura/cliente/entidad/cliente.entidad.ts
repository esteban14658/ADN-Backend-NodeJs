import { ReservaEntidad } from 'src/infraestructura/reserva/entidad/reserva.entidad';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

    @OneToMany(() => ReservaEntidad, (reserva) => reserva.cliente)
    reservas: ReservaEntidad[];

    set setId(id: number) {
        this.id = id;
    }
}