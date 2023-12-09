import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1702148354375 implements MigrationInterface {
  name = 'CreateUserTable1702148354375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user"
        (
            "id"            BIGSERIAL                NOT NULL,
            "name"          CHARACTER VARYING        NOT NULL,
            "password_hash" CHARACTER VARYING        NOT NULL,
            "password_salt" CHARACTER VARYING        NOT NULL,
            "refresh_token" CHARACTER VARYING,
            "created_at"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            "updated_at"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            CONSTRAINT "uq_user_name" UNIQUE ("name"),
            CONSTRAINT "pk_user" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
