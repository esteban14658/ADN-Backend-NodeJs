import { Module } from "@nestjs/common";
import { ClienteProveedorModule } from "./proveedor/cliente-proveedor.module";
import { ClienteControlador } from "./controlador/cliente.controlador";

@Module({
    imports: [
        ClienteProveedorModule
        ],
        controllers: [ClienteControlador],
})
export class ClienteModule {}
