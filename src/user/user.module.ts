import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/http/user.controller';
import { USER_REPOSITORY_PORT } from './domain/ports/user-repository.port';
import { USER_USE_CASES_PORT } from './application/ports/user-application.port';
import { UserService } from './application/service/user.service';
import { UserTypeOrmRepository } from './infrastructure/persistence/user.typeorm.repository';
import { UserOrmEntity } from './infrastructure/persistence/entities/user.orm-entity';
import { PASSWORD_HASHER_PORT } from './application/ports/password-hasher.port';
import { CryptoPasswordHasher } from './infrastructure/security/crypto-password-hasher';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_PORT,
      useClass: UserTypeOrmRepository,
    },
    {
      provide: USER_USE_CASES_PORT,
      useClass: UserService,
    },
    {
      provide: PASSWORD_HASHER_PORT,
      useClass: CryptoPasswordHasher,
    },
  ],
  exports: [USER_USE_CASES_PORT],
})
export class UserModule {}
