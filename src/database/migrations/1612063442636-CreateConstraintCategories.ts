import {MigrationInterface, QueryRunner, TableUnique} from "typeorm";

const categoryUniqueConstraint = new TableUnique({ columnNames: ["title"] });

export class CreateConstraintCategories1612063442636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createUniqueConstraint('categories', categoryUniqueConstraint);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropUniqueConstraint('categories', categoryUniqueConstraint);
    }

}
