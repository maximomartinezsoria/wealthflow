import { TransactionCreator } from '@/contexts/transactions/application/transaction-creator/transaction-creator';
import {
  Transaction,
  TransactionType,
} from '@/contexts/transactions/domain/transaction.entity';
import { MockTransactionRepository } from '@/contexts/transactions/tests/mocks/mock-transaction-repository';
import { TransactionCreatedEvent } from '@/shared/domain/events/transaction-created.event';
import { MockEventDispatcher } from '@/shared/tests/mocks/mock-event-dispatcher';

const transactionCreatorDto = {
  id: '1',
  amount: 100,
  type: 'INCOME' as TransactionType,
  userId: '101',
  balanceId: '1',
  balanceToId: '2',
  goalId: '1',
  createdAt: new Date(),
};

describe('TransactionCreator Use Case', () => {
  let eventDispatcher: MockEventDispatcher;
  let transactionRepository: MockTransactionRepository;
  let transactionCreator: TransactionCreator;

  beforeEach(() => {
    eventDispatcher = new MockEventDispatcher();
    transactionRepository = new MockTransactionRepository();
    transactionCreator = new TransactionCreator(
      transactionRepository,
      eventDispatcher,
    );
  });

  it('should call the repository with a transaction', async () => {
    const transaction = new Transaction(
      transactionCreatorDto.id,
      transactionCreatorDto.amount,
      transactionCreatorDto.type,
      transactionCreatorDto.userId,
      transactionCreatorDto.balanceId,
      transactionCreatorDto.balanceToId,
      transactionCreatorDto.goalId,
      transactionCreatorDto.createdAt,
    );

    await transactionCreator.execute(transaction);

    expect(transactionRepository.save).toHaveBeenCalledWith(transaction);
  });

  it('should dispatch a TransactionCreatedEvent', async () => {
    await transactionCreator.execute(transactionCreatorDto);

    expect(eventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.any(TransactionCreatedEvent),
    );
  });
});
