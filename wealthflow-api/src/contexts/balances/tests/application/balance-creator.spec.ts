import { BalanceCreator } from '@/contexts/balances/application/balance-creator/balance-creator';
import { Balance } from '@/contexts/balances/domain/balance.entity';
import { MockBalanceRepository } from '@/contexts/balances/tests/mocks/mock-balance-repository';
import { BalanceUpsertedEvent } from '@/shared/domain/events/balance-upserted.event';
import { MockEventDispatcher } from '@/shared/tests/mocks/mock-event-dispatcher';

const balanceCreatorDto = [
  {
    id: '1',
    name: 'Savings',
    amount: 1000,
    userId: '101',
    color: '#000000',
  },
];

describe('BalanceCreator Use Case', () => {
  let eventDispatcher: MockEventDispatcher;
  let balanceRepository: MockBalanceRepository;
  let balanceCreator: BalanceCreator;

  beforeEach(() => {
    eventDispatcher = new MockEventDispatcher();
    balanceRepository = new MockBalanceRepository();
    balanceCreator = new BalanceCreator(balanceRepository, eventDispatcher);
  });

  it('should call the repository with an array of balances', async () => {
    const balances = balanceCreatorDto.map((balanceDto) => {
      return new Balance(
        balanceDto.id,
        balanceDto.name,
        balanceDto.amount,
        balanceDto.amount,
        balanceDto.userId,
        balanceDto.color,
      );
    });

    await balanceCreator.execute(balances);

    expect(balanceRepository.save).toHaveBeenCalledWith(balances);
  });

  it('should get the balances from the db', async () => {
    await balanceCreator.execute(balanceCreatorDto);

    expect(balanceRepository.findByUserId).toHaveBeenCalledWith('101');
  });

  it('should dispatch a BalanceUpsertedEvent', async () => {
    await balanceCreator.execute(balanceCreatorDto);

    expect(eventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.any(BalanceUpsertedEvent),
    );
  });
});
