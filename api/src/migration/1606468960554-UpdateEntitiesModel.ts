import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntitiesModel1606468960554 implements MigrationInterface {
    name = 'UpdateEntitiesModel1606468960554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "users_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "cryptos" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cryptos" ADD "imgUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cryptos" ADD "default" boolean NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`COMMENT ON COLUMN "cryptos"."cmid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cryptos" ADD CONSTRAINT "UQ_9d9b77f32703717d7add24d217a" UNIQUE ("cmid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cryptos" DROP CONSTRAINT "UQ_9d9b77f32703717d7add24d217a"`);
        await queryRunner.query(`COMMENT ON COLUMN "cryptos"."cmid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cryptos" DROP COLUMN "default"`);
        await queryRunner.query(`ALTER TABLE "cryptos" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "cryptos" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currency"`);
    }

}
