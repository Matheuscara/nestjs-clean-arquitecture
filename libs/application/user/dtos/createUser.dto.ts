import { UserType } from '@app/domain';

export class CreateUserDto {
  nome: string;
  email: string;
  senha: string;
  type: UserType;
}
