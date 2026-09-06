import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { NotFoundException } from '../errors/NotFoundException.error';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
