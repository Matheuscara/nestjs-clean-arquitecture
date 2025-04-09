import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { UserType } from '@app/domain';
@Table({ tableName: 'usuarios', timestamps: false })
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column(DataType.STRING)
  nome: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  senha: string;

  @Column({ field: 'data_cadastro', type: DataType.DATE })
  dataCadastro: Date;

  @Column(DataType.ENUM(UserType.ADMIN, UserType.BASIC, UserType.MODERATOR))
  type: UserType;
}
