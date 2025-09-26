import { IDenunciaRepository } from '../repositories/IDenuncia';

export class DeleteVinylRecord {
  constructor(private readonly denunciaRepository: IDenunciaRepository) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const record = await this.denunciaRepository.findById(id);

    if (!record) {
      throw new Error('Denuncia record not found');
    }

    await this.denunciaRepository.delete(id);
  }
}
