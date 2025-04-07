import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

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
}
