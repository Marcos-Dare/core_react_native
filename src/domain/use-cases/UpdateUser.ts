
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Name } from '../value-objects/Name'; 
import { Email } from '../value-objects/Email';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';

export class UpdateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    id: string;
    name?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<User> {
    const { id, name, email, latitude, longitude } = params;

    const userExistente = await this.userRepository.findById(id);

    if (!userExistente) {
      throw new Error('Usuário não encontrado');
    }

    let userAtualizado = userExistente;

    if (name) {
      userAtualizado = userAtualizado.updateName(Name.create(name));
    }

    if (email) {
      userAtualizado = userAtualizado.updateEmail(Email.create(email));
    }
    
    if (latitude !== undefined && longitude !== undefined) {
      const newLocation = GeoCoordinates.create(latitude, longitude);
      userAtualizado = userAtualizado.updateLocation(newLocation);
    }

    await this.userRepository.update(userAtualizado);

    return userAtualizado;
  }
}