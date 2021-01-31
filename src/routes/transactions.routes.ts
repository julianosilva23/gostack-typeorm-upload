import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import multer from 'multer';
import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = await transactionsRepository.getBalance();
  const transactions = await transactionsRepository.find({ relations: ['category'] });

  return response.json({
    transactions,
    balance
  })
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  if(String(type) !== "income" && String(type) !== "outcome") throw new AppError("Invalid Type");

  const createTransactionService = new CreateTransactionService();

  const transaction = await createTransactionService.execute({
    title: title,
    value: value,
    type: type,
    category: category
  });

  console.log(transaction);

  return response.json(transaction);

});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransactionService = new DeleteTransactionService();

  const { id } = request.params;

  await deleteTransactionService.execute(id);

  return response.status(204).json();
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransactionsService = new ImportTransactionsService();

  const filename = request.file.filename;

  await importTransactionsService.execute(filename);

  return response.json({ ok: true });


});

export default transactionsRouter;
