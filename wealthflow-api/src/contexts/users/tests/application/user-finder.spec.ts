import { UserFinder } from '@/contexts/users/application/user-finder/user-finder';
import { User } from '@/contexts/users/domain/user.entity';
import { MockUserRepository } from '@/contexts/users/tests/mocks/mock-user-repository';

describe('UserFinder Use Case', () => {
  let userFinder: UserFinder;
  let userRepository: MockUserRepository;
  const email = 'john@doe.com';

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userFinder = new UserFinder(userRepository);
  });

  it('should call the repository with the received email', async () => {
    await userFinder.execute(email);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should return the user found by the repository', async () => {
    const repositoryUser = await userFinder.execute(email);

    const user = new User(
      repositoryUser.id,
      repositoryUser.email,
      repositoryUser.name,
      repositoryUser.monthlyIncome,
      repositoryUser.totalMoney,
      repositoryUser.payday,
    );

    expect(userRepository.findByEmail).toHaveReturnedWith(
      Promise.resolve(user),
    );
  });

  it('should return null if the user is not found', async () => {
    await userFinder.execute('non-existent@email.com');

    expect(userRepository.findByEmail).toHaveReturnedWith(
      Promise.resolve(null),
    );
  });
});
