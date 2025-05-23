import { User } from '../entities';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
}
