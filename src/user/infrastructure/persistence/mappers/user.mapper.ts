import { User } from 'src/user/domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return User.rehydrate({
      id: ormEntity.id,
      name: ormEntity.name,
      email: ormEntity.email,
      password: ormEntity.password,
      isActive: ormEntity.isActive,
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
    });
  }

  static toOrm(domain: User): UserOrmEntity {
    const primitives = domain.toPrimitives();
    const ormEntity = new UserOrmEntity();
    ormEntity.id = primitives.id;
    ormEntity.name = primitives.name;
    ormEntity.email = primitives.email;
    ormEntity.password = primitives.password;
    ormEntity.isActive = primitives.isActive;
    ormEntity.createdAt = primitives.createdAt;
    ormEntity.updatedAt = primitives.updatedAt;
    return ormEntity;
  }
}
