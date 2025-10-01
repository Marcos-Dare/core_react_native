import { randomUUID } from 'crypto';
import { User, UserRole } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';

export class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    const { name, email, password, role } = params;

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await this.hashPassword(password);

    // --- MUDANÇA AQUI ---
    // Agora passamos um objeto para o método create
    const user = User.create({
      id: randomUUID(),
      name: Name.create(name),
      email: Email.create(email),
      password: Password.create(hashedPassword),
      role: role,
    });
    // --- FIM DA MUDANÇA ---

    await this.userRepository.save(user);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    // Implementação temporária para o hash
    return `hashed_${password}`;
  }
}