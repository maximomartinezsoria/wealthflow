import { UserCreator } from '@/contexts/users/application/user-creator/user-creator';
import { UserCreatorDto } from '@/contexts/users/application/user-creator/user-creator.dto';
import { User } from '@/contexts/users/domain/user.entity';
import { MockUserRepository } from '@/contexts/users/tests/mocks/mock-user-repository';

describe('UserCreator Use Case', () => {
  let userCreator: UserCreator;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userCreator = new UserCreator(userRepository);
  });

  it('should call the repository with an instance of the User entity', async () => {
    const dto: UserCreatorDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      monthlyIncome: 1000,
      payday: 1,
    };

    await userCreator.execute(dto);

    const user = new User(
      dto.id,
      dto.email,
      dto.name,
      dto.monthlyIncome,
      0,
      0,
      dto.payday,
    );

    expect(userRepository.save).toHaveBeenCalledWith(user);
  });
});
