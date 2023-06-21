import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionUsuario1583873676081 implements MigrationInterface {
    name = 'MigracionUsuario1583873676081';

    public async up(queryRunner: QueryRunner): Promise<any> {
//        await queryRunner.query("CREATE TABLE `USUARIO` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `clave` varchar(255) NOT NULL, `fechaCreacion` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
//        await queryRunner.query("CREATE TABLE `CANCHA` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(50) NOT NULL, `ubicacion` varchar(50) NOT NULL, `telefono` varchar(50) NOT NULL, `email` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `USUARIO`", undefined);
    }

}
