import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';
import { Name } from '../value-objects/Descricao';
import { Photo } from '../value-objects/Photo';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { StatusDenuncia } from '../entities/Denuncia' 

export class UpdateDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: {
    id:string,
    userId: string;
    foto: Photo;
    descricao?: string;
    localizacao: GeoCoordinates;
    status: StatusDenuncia;
    dataHora: Date
  }): Promise<Denuncia> {
    const { id, userId, foto, descricao, localizacao, status, dataHora } = params;

    const denuncia = await this.denunciaRepository.findById(id);

    if (!denuncia) {
      throw new Error('Denuncia not found');
    }

    const newDescricao = descricao ? Name.create(descricao) : denuncia.descricao;
    const newDataHora = dataHora ? dataHora : denuncia.dataHora;
    const newPhoto = foto ? foto : denuncia.foto;

    const updatedDenuncia = Denuncia.create(
      denuncia.id,
      denuncia.userId,
      newPhoto,
      denuncia.localizacao,
      denuncia.status,
      newDataHora,
    );

    await this.denunciaRepository.update(updatedDenuncia);

    return updatedDenuncia;
  }
}
