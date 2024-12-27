import { UserFinder } from '@/contexts/users/application/user-finder/user-finder';
import { User } from '@/contexts/users/domain/user.entity';
import { MockUserRepository } from '@/contexts/users/tests/mocks/mock-user-repository';

describe('UserFinder Use Case', () => {
  let userFinder: UserFinder;
  let userRepository: MockUserRepository;
  const id = '1';

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userFinder = new UserFinder(userRepository);
  });

  it('should call the repository with the received id', async () => {
    await userFinder.execute(id);
    expect(userRepository.find).toHaveBeenCalledWith(id);
  });

  it('should return the user found by the repository', async () => {
    const repositoryUser = await userFinder.execute(id);

    const user = new User(
      repositoryUser.id,
      repositoryUser.email,
      repositoryUser.name,
      repositoryUser.monthlyIncome,
      repositoryUser.totalMoney,
      repositoryUser.lastMonthTotalMoney,
      repositoryUser.payday,
    );

    expect(userRepository.find).toHaveReturnedWith(Promise.resolve(user));
  });

  it('should return null if the user is not found', async () => {
    await userFinder.execute('1');

    expect(userRepository.find).toHaveReturnedWith(Promise.resolve(null));
  });
});
