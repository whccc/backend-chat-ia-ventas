import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/user.controller';
import { USER_REPOSITORY_PORT } from './domain/ports/user-repository.port';
import { USER_USE_CASES_PORT } from './application/ports/user-application.port';
import { UserService } from './application/service/user.service';
import { UserTypeOrmRepository } from './infrastructure/persistence/user.typeorm.repository';

@Module({
  imports: [],
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
  ],
})
export class UserModule {}
