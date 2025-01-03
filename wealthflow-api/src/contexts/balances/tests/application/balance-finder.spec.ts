import { BalanceFinder } from '@/contexts/balances/application/balance-finder/balance-finder';
import { Balance } from '@/contexts/balances/domain/balance.entity';
import { MockBalanceRepository } from '@/contexts/balances/tests/mocks/mock-balance-repository';

const balanceFinderDto = {
  userId: '1',
};

describe('BalanceFinder Use Case', () => {
  let balanceRepository: MockBalanceRepository;
  let balanceFinder: BalanceFinder;

  beforeEach(() => {
    balanceRepository = new MockBalanceRepository();
    balanceFinder = new BalanceFinder(balanceRepository);
  });

  it('should call the repository with the received id', async () => {
    await balanceFinder.execute({ userId: balanceFinderDto.userId });

    expect(balanceRepository.findByUserId).toHaveBeenCalledWith(
      balanceFinderDto.userId,
    );
  });

  it('should return the balances found by the repository', async () => {
    const repositoryBalances = await balanceFinder.execute({
      userId: balanceFinderDto.userId,
    });

    const balances = repositoryBalances.map(
      (balance) =>
        new Balance(
          balance.id,
          balance.name,
          balance.amount,
          balance.usable,
          balance.userId,
          balance.color,
        ),
    );

    expect(balanceRepository.findByUserId).toHaveReturnedWith(
      Promise.resolve(balances),
    );
  });
});
