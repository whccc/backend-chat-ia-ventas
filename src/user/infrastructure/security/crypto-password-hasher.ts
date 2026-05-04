import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as scryptCallback } from 'crypto';
import { promisify } from 'util';
import { PasswordHasherPort } from 'src/user/application/ports/password-hasher.port';

const scrypt = promisify(scryptCallback);

@Injectable()
export class CryptoPasswordHasher implements PasswordHasherPort {
  async hash(value: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scrypt(value, salt, 64)) as Buffer;

    return `${salt}:${derivedKey.toString('hex')}`;
  }
}