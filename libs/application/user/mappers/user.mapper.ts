import { User } from '@app/domain';
import { CreateUserDto } from '@app/application';

export class UserMapper {
  static toDomainInFromCreate(dto: CreateUserDto): User {
    return new User(dto.nome, dto.email, dto.senha, new Date(), dto.type);
  }

  static toResponse(user: User) {
    return {
      nome: user.nome,
      email: user.email,
      dataCadastro: user.dataCadastro,
      type: user.type,
    };
  }
}
