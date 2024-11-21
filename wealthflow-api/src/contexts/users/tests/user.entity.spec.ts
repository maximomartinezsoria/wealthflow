import { InvalidMonthlyIncomeException } from '@/contexts/users/domain/invalid-monthly-income.exception';
import { User } from '@/contexts/users/domain/user.entity';

const userData = {
  id: '1',
  name: 'John Doe',
  email: 'john@doe.com',
  monthlyIncome: 1000,
  totalMoney: 1000,
};

describe('User Entity', () => {
  it('should create a user', async () => {
    const user = new User(
      userData.id,
      userData.email,
      userData.name,
      userData.monthlyIncome,
      userData.totalMoney,
    );

    expect(user.name).toBe(userData.name);
  });

  it('should not create a user with negative monthly income', async () => {
    expect(() => {
      new User(
        userData.id,
        userData.email,
        userData.name,
        -1,
        userData.totalMoney,
      );
    }).toThrow(InvalidMonthlyIncomeException);
  });
});
