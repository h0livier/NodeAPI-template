import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatedUser1694635876506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(
            `CREATE OR ALTER TABLE "User"(
                
            )`
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
