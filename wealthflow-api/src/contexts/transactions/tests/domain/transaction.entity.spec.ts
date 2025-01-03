import { InvalidAmountException } from '@/contexts/transactions/domain/invalid-amount.exception';
import { Transaction } from '@/contexts/transactions/domain/transaction.entity';

const transactionData = {
  id: '1',
  amount: 1000,
  type: 'income',
  userId: '1',
  balanceId: '1',
  balanceToId: '',
  goalId: '1',
  createdAt: new Date(),
};

function createTransaction(transactionData) {
  return new Transaction(
    transactionData.id,
    transactionData.amount,
    transactionData.type,
    transactionData.userId,
    transactionData.balanceId,
    transactionData.balanceToId,
    transactionData.goalId,
    transactionData.createdAt,
  );
}

describe('Transaction Entity', () => {
  it('should create a transaction', async () => {
    const transaction = createTransaction(transactionData);

    expect(transaction).toBeInstanceOf(Transaction);
  });

  it('should not create a transaction with negative amount', async () => {
    expect(() => {
      createTransaction({ ...transactionData, amount: -1000 });
    }).toThrow(InvalidAmountException);
  });
});
