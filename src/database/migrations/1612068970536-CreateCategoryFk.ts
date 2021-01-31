import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateCategoryFk1612068970536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createForeignKey('transactions', new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        name: 'id_category_transaction_fk',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('transactions', 'id_category_transaction_fk')
    }

}
