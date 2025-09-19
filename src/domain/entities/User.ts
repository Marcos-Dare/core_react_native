import { Email } from '../value-objects/Email';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { Name } from '../value-objects/Name';
import { Password } from '../value-objects/Password';

export type UserRole = "cidadão" | "agente";

export class User {
  private constructor(
    readonly id: string,
    readonly name: Name,
    readonly email: Email,
    readonly password: Password,
    readonly role: UserRole
  ) {}

  static create(
    id: string,
    name: Name,
    email: Email,
    password: Password,
    role: UserRole
  ): User {
    return new User(id, name, email, password, role);
  }
}

