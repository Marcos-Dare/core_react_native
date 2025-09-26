import { User } from '../domain/entities/User';
import { Email } from '../domain/value-objects/Email';
import { GeoCoordinates } from '../domain/value-objects/GeoCoordinates';
import { Name } from '../domain/value-objects/Descricao';
import { Password } from '../domain/value-objects/Password';

export class UserFactory {
  static create(params: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    latitude?: number;
    longitude?: number;
  }): User {
    return User.create(
      params.id || Math.random().toString(),
      Name.create(params.name || 'John Doe'),
      Email.create(params.email || 'john.doe@example.com'),
      Password.create(params.password || 'password123'),
      GeoCoordinates.create(params.latitude || 40.7128, params.longitude || -74.0060)
    );
  }
}
