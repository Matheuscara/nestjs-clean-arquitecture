import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@app/domain';
import { UserModel } from '@app/infrastructure';
import { UserMapper } from '@app/infrastructure';
import { DataBaseConnection } from '../connection/database.connection';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: DataBaseConnection) {
    this.db.sequelize.addModels([UserModel]);
  }

  async create(user: User): Promise<User> {
    const data = UserMapper.toModel(user);
    const created = await UserModel.create(data);
    return UserMapper.toDomain(created);
  }

  async findById(id: number): Promise<User | null> {
    const found = await UserModel.findByPk(id);
    return found ? UserMapper.toDomain(found) : null;
  }
}
