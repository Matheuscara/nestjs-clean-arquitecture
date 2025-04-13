import { UserType } from '@app/domain';
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsEnum(UserType)
  type: UserType;
}
