import { UserType } from '../enums/user-type.enum';
import { IsEmail, IsNotEmpty, IsEnum, validate } from 'class-validator';

export class User {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  public readonly nome: string;

  @IsEmail({}, { message: 'Email deve ser válido' })
  public readonly email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  public readonly senha: string;

  public readonly dataCadastro: Date;

  @IsEnum(UserType, { message: 'Tipo de usuário inválido' })
  public readonly type: UserType;

  constructor(
    nome: string,
    email: string,
    senha: string,
    dataCadastro: Date = new Date(),
    type: UserType = UserType.BASIC,
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = dataCadastro;
    this.type = type;

    this.validate();
  }

  private async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(
        `Validação falhou: ${errors.map((err) => Object.values(err.constraints)).join(', ')}`,
      );
    }
  }
}
