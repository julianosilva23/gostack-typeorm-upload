import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1612042720628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'type',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'value',
              type: 'numeric',
              isNullable: false,
            },
            {
              name: 'category_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp without time zone',
              isNullable: false,
              default: 'NOW()'
            },
            {
              name: 'updated_at',
              type: 'timestamp without time zone',
              isNullable: true,
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('transactions');
    }

}
