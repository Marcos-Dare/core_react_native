
import { Email } from '../value-objects/Email';
import { Name } from '../value-objects/Name';
import { Password } from '../value-objects/Password';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';

export type UserRole = "cidadão" | "agente";

export class User {
  readonly id: string;
  readonly name: Name;
  readonly email: Email;
  readonly password: Password;
  readonly role: UserRole;
  readonly location: GeoCoordinates | null;

  private constructor(props: {
    id: string;
    name: Name;
    email: Email;
    password: Password;
    role: UserRole;
    location: GeoCoordinates | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.location = props.location;
  }

  static create(props: {
    id: string;
    name: Name;
    email: Email;
    password: Password;
    role: UserRole;
    location?: GeoCoordinates;
  }): User {
    return new User({
      ...props,
      location: props.location ?? null,
    });
  }

  public updateName(newName: Name): User {
    return new User({ ...this, name: newName });
  }

  public updateEmail(newEmail: Email): User {
    return new User({ ...this, email: newEmail });
  }

  public updateLocation(newLocation: GeoCoordinates | null): User {
    return new User({ ...this, location: newLocation });
  }
}