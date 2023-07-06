import { Module } from "@nestjs/common";
import { ClienteEntidad } from "../entidad/cliente.entidad";
import { ManejadorListarCliente } from "src/aplicacion/cliente/consulta/listar-clientes.manejador";
import { ManejadorRegistrarCliente } from "src/aplicacion/cliente/comando/registrar-cliente.manejador";
import { daoClienteProvider } from "./dao/dao-cliente.proveedor";
import { RepositorioCliente } from "src/dominio/cliente/puerto/repositorio/repositorio-cliente";
import { servicioRegistrarClienteProveedor } from "./servicio/servicio-registrar-cliente.proveedor";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicioRegistrarCliente } from "src/dominio/cliente/servicio/servicio-registrar-cliente";
import { DaoCliente } from "src/dominio/cliente/puerto/dao/dao-cliente";
import { repositorioClienteProvider } from "./repositorio/repositorio-cliente.proveedor";
import { DaoClienteMysql } from "../adaptador/dao/dao-cliente-mysql";
import { ManejadorActualizarCliente } from "src/aplicacion/cliente/comando/actualizar-cliente.manejador";
import { ServicioActualizarCliente } from "src/dominio/cliente/servicio/servicio-actualizar-cliente";
import { servicioActualizarClienteProveedor } from "./servicio/servicio-actualizar-cliente-proveedor";
import { ManejadorConsultarExistenciaCliente } from "src/aplicacion/cliente/consulta/consultar-existencia-cliente.manejador";

@Module({
    imports: [TypeOrmModule.forFeature([ClienteEntidad])],
    providers: [
        { provide: ServicioRegistrarCliente, inject: [RepositorioCliente], useFactory: servicioRegistrarClienteProveedor },
        { provide: ServicioActualizarCliente, inject: [RepositorioCliente], useFactory: servicioActualizarClienteProveedor },
        repositorioClienteProvider,
        daoClienteProvider,
        ManejadorRegistrarCliente,
        ManejadorListarCliente,
        ManejadorActualizarCliente,
        ManejadorConsultarExistenciaCliente,
        DaoClienteMysql,
    ],
    exports: [
        ServicioRegistrarCliente,
        ServicioActualizarCliente, 
        ManejadorRegistrarCliente,
        ManejadorActualizarCliente,
        ManejadorListarCliente,
        ManejadorConsultarExistenciaCliente,
        RepositorioCliente,
        DaoCliente,
        DaoClienteMysql,
    ],
    })
    export class ClienteProveedorModule { }
    