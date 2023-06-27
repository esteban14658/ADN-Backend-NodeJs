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

@Module({
    imports: [TypeOrmModule.forFeature([ClienteEntidad])],
    providers: [
        { provide: ServicioRegistrarCliente, inject: [RepositorioCliente], useFactory: servicioRegistrarClienteProveedor },
        repositorioClienteProvider,
        daoClienteProvider,
        ManejadorRegistrarCliente,
        ManejadorListarCliente,
        DaoClienteMysql,
    ],
    exports: [
        ServicioRegistrarCliente,
        ManejadorRegistrarCliente,
        ManejadorListarCliente,
        RepositorioCliente,
        DaoCliente,
        DaoClienteMysql,
    ],
    })
    export class ClienteProveedorModule { }
    