import { TransactionFinder } from '@/contexts/transactions/application/transaction-finder/transaction-finder';
import { TransactionFinderDto } from '@/contexts/transactions/application/transaction-finder/transaction-finder.dto';
import { Transaction } from '@/contexts/transactions/domain/transaction.entity';
import { MockTransactionRepository } from '@/contexts/transactions/tests/mocks/mock-transaction-repository';

const transactionFinderDto: TransactionFinderDto = {
  userId: '1',
  criteria: {
    fromDate: new Date(),
    toDate: new Date(),
    transactionType: 'INCOME',
    balanceId: '1',
  },
};

describe('TransactionFinder Use Case', () => {
  let transactionRepository: MockTransactionRepository;
  let transactionFinder: TransactionFinder;

  beforeEach(() => {
    transactionRepository = new MockTransactionRepository();
    transactionFinder = new TransactionFinder(transactionRepository);
  });

  it('should call the repository with the received id and criteria', async () => {
    await transactionFinder.execute({
      userId: transactionFinderDto.userId,
      criteria: transactionFinderDto.criteria,
    });

    expect(transactionRepository.find).toHaveBeenCalledWith(
      transactionFinderDto.userId,
      transactionFinderDto.criteria,
    );
  });

  it('should return the transactions found by the repository', async () => {
    const repositoryTransactions = await transactionFinder.execute({
      userId: transactionFinderDto.userId,
      criteria: transactionFinderDto.criteria,
    });

    const transactions = repositoryTransactions.map(
      (transaction) =>
        new Transaction(
          transaction.id,
          transaction.amount,
          transaction.type,
          transaction.userId,
          transaction.balanceId,
          transaction.balanceToId,
          transaction.goalId,
          transaction.createdAt,
        ),
    );

    expect(transactionRepository.find).toHaveReturnedWith(
      Promise.resolve(transactions),
    );
  });
});
