import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { NotFoundException } from '../errors/NotFoundException.error';
import { OutputUserDto } from 'src/users/presentation/outputuser.dto';

export type GetUserUseCaseInput = {
  id: string;
};

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserUseCaseInput): Promise<OutputUserDto> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
    };
  }
}
