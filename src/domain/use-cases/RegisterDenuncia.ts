import { Denuncia } from '../entities/Denuncia';
import { IDenunciaRepository } from '../repositories/IDenuncia';
import { Name } from '../value-objects/Descricao';
import { Photo } from '../value-objects/Photo';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { StatusDenuncia } from '../entities/Denuncia' 

export class RegisterDenuncia {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: {
    userId: string;
    foto: Photo;
    descricao: string;
    localizacao: GeoCoordinates;
    status: StatusDenuncia;
    dataHora: Date
  }): Promise<Denuncia> {
    const { userId, foto, descricao, localizacao, status, dataHora } = params;

    const denuncia = Denuncia.create(
      Math.random().toString(),
      userId,
      foto,
      localizacao,
      status,
      dataHora,
      descricao
    )


    await this.denunciaRepository.save(denuncia);

    return denuncia;
  }
}
