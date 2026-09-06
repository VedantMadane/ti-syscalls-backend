import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export type FindAllUsersUseCaseOutput = User[];

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<FindAllUsersUseCaseOutput> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
