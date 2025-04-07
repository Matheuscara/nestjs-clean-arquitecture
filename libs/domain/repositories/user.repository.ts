import { User } from '../entities';
export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
}
