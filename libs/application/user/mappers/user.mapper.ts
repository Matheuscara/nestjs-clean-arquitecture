import { User } from '@app/domain';
import { CreateUserDto } from '@app/application/user';

export class UserMapper {
  static toDomain(dto: CreateUserDto): User {
    return new User(dto.nome, dto.email, dto.senha);
  }

  static toResponse(user: User) {
    return {
      nome: user.nome,
      email: user.email,
      dataCadastro: user.dataCadastro,
    };
  }
}
