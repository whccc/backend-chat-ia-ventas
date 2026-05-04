import { UserService } from './user.service';
import { UserRepositoryPort } from 'src/user/domain/ports/user-repository.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { UserEmailAlreadyExistsError } from 'src/user/domain/errors/user-email-already-exists.error';
import { User } from 'src/user/domain/entities/user.entity';

describe('UserService', () => {
  const userRepository: jest.Mocked<UserRepositoryPort> = {
    save: jest.fn(),
    findByEmail: jest.fn(),
  };

  const passwordHasher: jest.Mocked<PasswordHasherPort> = {
    hash: jest.fn(),
  };

  const service = new UserService(userRepository, passwordHasher);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hashes the password and saves the user', async () => {
    passwordHasher.hash.mockResolvedValue('salt:hash');
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockImplementation(async (user: User) => user);

    const result = await service.createUser({
      name: 'Juan',
      email: 'juan@mail.com',
      password: 'secret123',
    });

    expect(passwordHasher.hash).toHaveBeenCalledWith('secret123');
    expect(userRepository.findByEmail).toHaveBeenCalledWith('juan@mail.com');
    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(result.email).toBe('juan@mail.com');
  });

  it('throws when the email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue(
      User.rehydrate({
        id: 'existing-id',
        name: 'Existing User',
        email: 'juan@mail.com',
        password: 'salt:hash',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      service.createUser({
        name: 'Juan',
        email: 'juan@mail.com',
        password: 'secret123',
      }),
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError);
  });
});