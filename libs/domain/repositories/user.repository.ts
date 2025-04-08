import { User } from '../entities';

// complicando demais ainda
export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
}
