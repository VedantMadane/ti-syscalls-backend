import { beforeEach, describe, expect, it } from '@jest/globals';
import { FindAllUsersUseCase } from '../../findallusers.usecase';
import { InMemoryUserRepository } from '../../../../infrastructure/repositories/in-memory-user.repository';
import { User, UserRole } from '../../../../domain/entities/user.entity';

describe('FindAllUsersUseCase Unit Tests', () => {
  let useCase: FindAllUsersUseCase;
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    useCase = new FindAllUsersUseCase(repository);
  });

  it('should return an empty array when there are no users', async () => {
    const output = await useCase.execute();

    expect(output).toEqual([]);
  });

  it('should return all users without password', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });
    await repository.insert(user);

    const output = await useCase.execute();

    expect(output).toHaveLength(1);
    expect(output[0]).toEqual({
      id: user.getId(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.USER,
    });
  });

  it('should return users without the password field', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });
    await repository.insert(user);

    const output = await useCase.execute();

    expect(output[0]).not.toHaveProperty('password');
  });

  it('should return all persisted users', async () => {
    const first = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password1',
    });
    const second = User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password2',
    });
    await repository.insert(first);
    await repository.insert(second);

    const output = await useCase.execute();

    expect(output).toHaveLength(2);
    expect(output[0].id).toBe(first.getId());
    expect(output[1].id).toBe(second.getId());
  });

  it('should return users with different roles', async () => {
    const admin = User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password',
      role: UserRole.ADMIN,
    });
    await repository.insert(admin);

    const output = await useCase.execute();

    expect(output[0].role).toBe(UserRole.ADMIN);
  });
});
