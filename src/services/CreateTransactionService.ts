// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionRequest {
  title: string;

  type: 'income' | 'outcome';

  value: number;

  category: string;
}

export default class CreateTransactionService {
  public async execute({title, type, value, category}: TransactionRequest): Promise<Transaction> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const categoryModel = await categoriesRepository.findOrCreateByTitle(category);

    if(!category) {
      throw new Error('erro on create category');
    }

    const { income } = await transactionsRepository.getBalance();

    if(type === 'outcome'
      && value > income) throw new AppError('does not have founds');

    const transactions = await transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryModel.id ?? null
    });

    await transactionsRepository.save(transactions);

    return transactions;
  }
}
