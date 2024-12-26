import { Balance } from '@/contexts/balances/domain/balance.entity';
import { InvalidAmountException } from '@/contexts/balances/domain/invalid-amount.exception';

const balanceData = {
  id: '1',
  name: 'Savings',
  amount: 1000,
  usable: 1000,
  color: '#000000',
  userId: '1',
};

function createBalance(balanceData) {
  return new Balance(
    balanceData.id,
    balanceData.name,
    balanceData.amount,
    balanceData.usable,
    balanceData.userId,
    balanceData.color,
  );
}

describe('Balance Entity', () => {
  it('should create a balance', async () => {
    const balance = createBalance(balanceData);

    expect(balance).toBeInstanceOf(Balance);
  });

  it('should not create a balance with negative amount', async () => {
    expect(() => {
      createBalance({ ...balanceData, amount: -1000 });
    }).toThrow(InvalidAmountException);
  });
});
