import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { OutputUserDto } from 'src/users/presentation/outputuser.dto';

export type FindAllUsersUseCaseOutput = OutputUserDto[];

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<FindAllUsersUseCaseOutput> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
    }));
  }
}
