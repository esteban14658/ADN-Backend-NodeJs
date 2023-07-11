import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservaEntidad } from "../entidad/reserva.entidad";
import { ServicioRegistrarReserva } from "src/dominio/reserva/servicio/servicio-registrar-reserva";
import { RepositorioReserva } from "src/dominio/reserva/puerto/repositorio/repositorio-reserva";
import { servicioRegistrarReservaProveedor } from "./servicio/servicio-registrar-reserva.proveedor";
import { repositorioReservaProvider } from "./repositorio/repositorio-reserva.proveedor";
import { daoReservaProvider } from "./dao/dao-reserva.proveedor";
import { ManejadorRegistrarReserva } from "src/aplicacion/reserva/comando/registrar-reserva.manejador";
import { ManejadorListarReserva } from "src/aplicacion/reserva/consulta/listar-reservas.manejador";
import { DaoReserva } from "src/dominio/reserva/puerto/dao/dao-reserva";
import { ClienteProveedorModule } from "src/infraestructura/cliente/proveedor/cliente-proveedor.module";
import { DaoClienteMysql } from "src/infraestructura/cliente/adaptador/dao/dao-cliente-mysql";
import { ManejadorConsultarExistenciaReserva } from "src/aplicacion/reserva/consulta/consultar-existencia-reservas.manejador";
import { ServicioEliminarReserva } from "src/dominio/reserva/servicio/servicio-eliminar-reserva";
import { servicioEliminarReservaProveedor } from "./servicio/servicio-eliminar-reserva.proveedor";
import { ManejadorEliminarReserva } from "src/aplicacion/reserva/comando/eliminar-reserva.manejador";
import { ManejadorConsultarExistenciaPorId } from "src/aplicacion/reserva/consulta/consultar-existencia-reserva-por-id.manejador";

@Module({
    imports: [TypeOrmModule.forFeature([ReservaEntidad]),
            ClienteProveedorModule],
    providers: [
        { provide: ServicioRegistrarReserva, inject: [RepositorioReserva, DaoReserva], useFactory: servicioRegistrarReservaProveedor },
        { provide: ServicioEliminarReserva, inject: [RepositorioReserva, DaoReserva], useFactory: servicioEliminarReservaProveedor },
        repositorioReservaProvider,
        daoReservaProvider,
        ManejadorRegistrarReserva,
        ManejadorListarReserva,
        ManejadorConsultarExistenciaReserva,
        ManejadorConsultarExistenciaPorId,
        ManejadorEliminarReserva,
        DaoClienteMysql,
    ],
    exports: [
        ServicioRegistrarReserva,
        ManejadorRegistrarReserva,
        ManejadorListarReserva,
        ManejadorConsultarExistenciaReserva,
        ManejadorConsultarExistenciaPorId,
        ManejadorEliminarReserva,
        RepositorioReserva,
        DaoReserva,
    ],
})
export class ReservaProveedorModule {}