import { IDenunciaRepository } from '../../domain/repositories/IDenuncia';
import { Denuncia, StatusDenuncia } from '../../domain/entities/Denuncia';

export class MockDenunciaRepository implements IDenunciaRepository {
  private denuncia: Denuncia[] = [];

  async save(denuncia: Denuncia): Promise<void> {
    this.denuncia.push(denuncia);
  }

  async findById(id: string): Promise<Denuncia | null> {
    return this.denuncia.find(denuncia => denuncia.id === id) || null;
  }

  async findByUserId(userId: string): Promise<Denuncia[]> {
    return new Promise(() => {});
  }

  async findByStatus(status: StatusDenuncia): Promise<Denuncia[]> {
    return new Promise(() => {});
  }

  async findAll(): Promise<Denuncia[]> {
    return this.denuncia;
  }

  async update(denuncia: Denuncia): Promise<void> {
    const denunciaIndex = this.denuncia.findIndex(r => r.id === denuncia.id);
    if (denunciaIndex !== -1) {
      this.denuncia[denunciaIndex] = denuncia;
    }
  }

  async delete(id: string): Promise<void> {
    this.denuncia = this.denuncia.filter(denuncia => denuncia.id !== id);
  }
}
