import { User } from '@app/domain';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toDomain(model: UserModel): User {
    return new User(model.nome, model.email, model.senha, model.dataCadastro);
  }

  static toModel(user: User): Partial<UserModel> {
    return {
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      dataCadastro: user.dataCadastro,
    };
  }
}
