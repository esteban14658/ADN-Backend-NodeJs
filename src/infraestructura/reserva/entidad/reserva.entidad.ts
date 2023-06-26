import { ClienteEntidad } from 'src/infraestructura/cliente/entidad/cliente.entidad';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'RESERVA' })
export class ReservaEntidad{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @ManyToOne(() => ClienteEntidad, (cliente) => cliente.reservas)
    cliente: ClienteEntidad;
}
