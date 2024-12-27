import { InvalidMonthlyIncomeException } from '@/contexts/users/domain/invalid-monthly-income.exception';
import { InvalidPaydayException } from '@/contexts/users/domain/invalid-payday.exception';
import { User } from '@/contexts/users/domain/user.entity';

const userData = {
  id: '1',
  name: 'John Doe',
  email: 'john@doe.com',
  monthlyIncome: 1000,
  totalMoney: 1000,
  lastMonthTotalMoney: 1000,
  payday: 1,
};

describe('User Entity', () => {
  it('should create a user', async () => {
    const user = new User(
      userData.id,
      userData.email,
      userData.name,
      userData.monthlyIncome,
      userData.totalMoney,
      userData.lastMonthTotalMoney,
      userData.payday,
    );

    expect(user).toBeInstanceOf(User);
  });

  it('should not create a user with negative monthly income', async () => {
    expect(() => {
      new User(
        userData.id,
        userData.email,
        userData.name,
        -1,
        -1,
        userData.totalMoney,
        userData.payday,
      );
    }).toThrow(InvalidMonthlyIncomeException);
  });

  it('should not create a user with invalid payday', async () => {
    expect(() => {
      new User(
        userData.id,
        userData.email,
        userData.name,
        userData.monthlyIncome,
        userData.totalMoney,
        userData.lastMonthTotalMoney,
        32,
      );
    }).toThrow(InvalidPaydayException);
  });
});
