import { User } from './user.entity';

describe('User', () => {
  it('creates an active user with normalized fields', () => {
    const user = User.create({
      name: '  Juan   Perez  ',
      email: 'JUAN@MAIL.COM',
      password: 'hashed-password',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toBe('Juan Perez');
    expect(user.email).toBe('juan@mail.com');
    expect(user.isActive).toBe(true);
  });

  it('rejects invalid plain password policy', () => {
    expect(() => User.ensurePasswordPolicy('123')).toThrow(
      'User password must have at least 6 characters',
    );
  });
});