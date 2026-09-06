import { UserRole } from '../../domain/entities/user.entity';

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
