import {MigrationInterface, QueryRunner} from "typeorm";

export class init1605284501619 implements MigrationInterface {
    name = 'init1605284501619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cryptos" ("id" SERIAL NOT NULL, "cmid" character varying NOT NULL, CONSTRAINT "PK_ef652cc06c83b810bc7775dde08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_cryptos_cryptos" ("usersId" integer NOT NULL, "cryptosId" integer NOT NULL, CONSTRAINT "PK_fd67f0eaecc6240f63e8283dc0c" PRIMARY KEY ("usersId", "cryptosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45edfb41d2d1b2a6817b931d1d" ON "users_cryptos_cryptos" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78d893d0bda04c9cc0b7aeda28" ON "users_cryptos_cryptos" ("cryptosId") `);
        await queryRunner.query(`ALTER TABLE "users_cryptos_cryptos" ADD CONSTRAINT "FK_45edfb41d2d1b2a6817b931d1d6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_cryptos_cryptos" ADD CONSTRAINT "FK_78d893d0bda04c9cc0b7aeda285" FOREIGN KEY ("cryptosId") REFERENCES "cryptos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_cryptos_cryptos" DROP CONSTRAINT "FK_78d893d0bda04c9cc0b7aeda285"`);
        await queryRunner.query(`ALTER TABLE "users_cryptos_cryptos" DROP CONSTRAINT "FK_45edfb41d2d1b2a6817b931d1d6"`);
        await queryRunner.query(`DROP INDEX "IDX_78d893d0bda04c9cc0b7aeda28"`);
        await queryRunner.query(`DROP INDEX "IDX_45edfb41d2d1b2a6817b931d1d"`);
        await queryRunner.query(`DROP TABLE "users_cryptos_cryptos"`);
        await queryRunner.query(`DROP TABLE "cryptos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
