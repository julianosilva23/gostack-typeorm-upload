import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { getConnection, getManager } from 'typeorm';
import { destinationPath } from '../config/upload';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import { LoadCsvService } from './LoadCsvService';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {

    const createTransactionService = new CreateTransactionService();

    const csvFilePath = path.resolve(destinationPath, filename);

    const loadCsvService = new LoadCsvService();

    const rawTransactions = await loadCsvService.execute(csvFilePath);

    const transactions:Transaction[] = [];

    let transaction = null;

    await getManager().transaction(async transactionalEntityManager => {
      for(let [title, type, value, category] of rawTransactions) {
        transaction = await createTransactionService.execute({
          title,
          type,
          value,
          category
        });

        transactions.push(transaction);

      }
    });

    return transactions;
  }

  await fs.promises.unlink(csvFilePath);
}

export default ImportTransactionsService;
