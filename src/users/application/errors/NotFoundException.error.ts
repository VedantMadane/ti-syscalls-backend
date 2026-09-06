import { DomainError } from 'src/shared/domain/global-contract.error';

export class NotFoundException extends DomainError {
  constructor() {
    super('User not found');
  }
}
