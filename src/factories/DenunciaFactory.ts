import { v4 as uuidv4 } from 'uuid';
import { Denuncia } from '../domain/entities/Denuncia';
import { Photo } from '../domain/value-objects/Photo';
import { GeoCoordinates } from '../domain/value-objects/GeoCoordinates';

export class DenunciaFactory {
  static create(params: {
    id?: string;
    userId?: string;
    photoUrl?: string;
    descricao?: string;
    latitude?: number;
    longitude?: number;
  }): Denuncia {
    // Define os valores padrão para uma denúncia de teste
    const id = params.id ?? uuidv4();
    const userId = params.userId ?? uuidv4(); // Um ID de usuário qualquer para o teste
    const photo = Photo.create(params.photoUrl ?? 'https://example.com/denuncia.jpg');
    const descricao = params.descricao ?? 'Descrição de teste para a denúncia.';
    
    // Coordenadas padrão (ex: Av. Paulista em São Paulo)
    const latitude = params.latitude ?? -23.5613;
    const longitude = params.longitude ?? -46.6565;
    const localizacao = GeoCoordinates.create(latitude, longitude);

    // Chama o método .create da entidade com um único objeto de propriedades
    return Denuncia.create({
      id,
      userId,
      foto: photo,
      descricao,
      localizacao,
    });
  }
}