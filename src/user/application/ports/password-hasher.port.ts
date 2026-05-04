export const PASSWORD_HASHER_PORT = 'PASSWORD_HASHER_PORT';

export interface PasswordHasherPort {
  hash(value: string): Promise<string>;
}