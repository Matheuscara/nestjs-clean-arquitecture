import { UserType } from '../enums/user-type.enum';

export class User {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dataCadastro: Date = new Date(),
    public type: UserType = UserType.BASIC,
  ) {}
}
