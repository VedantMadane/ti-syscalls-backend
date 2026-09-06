import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { NotFoundException } from '../errors/NotFoundException.error';

export type GetUserUseCaseInput = {
  id: string;
};

export type GetUserUseCaseOutput = User;

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
