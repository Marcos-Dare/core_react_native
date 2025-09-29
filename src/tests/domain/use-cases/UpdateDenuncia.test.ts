import { UpdateDenuncia } from '../../../domain/use-cases/UpdateDenuncia';
import { RegisterDenuncia } from '../../../domain/use-cases/RegisterDenuncia';
import { MockDenunciaRepository } from '../../../infra/repositories/MockDenunciaRepository';
import { Photo } from '../../../domain/value-objects/Photo';


let data = new Date()
describe('UpdateVinylRecord', () => {
  it('should update a vinyl record', async () => {
    const denunciaRepository = new MockDenunciaRepository();
    const registerDenuncia = new RegisterDenuncia(denunciaRepository);
    const updateVinylRecord = new UpdateDenuncia(denunciaRepository);

    const denuncia = await registerDenuncia.execute({
      userId: "1",
      descricao: "denuncia feita",
      status: "pendente",
      dataHora: data,
    });

    const updatedRecord = await updateVinylRecord.execute({
      id: record.id,
      album: 'The White Album',
    });

    expect(updatedRecord.album.value).toBe('The White Album');
  });

  it('should throw an error if the vinyl record is not found', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);

    await expect(
      updateVinylRecord.execute({
        id: '1',
        album: 'The White Album',
      })
    ).rejects.toThrow('Vinyl record not found');
  });

  it('should not update vinyl record fields if they are not provided', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
    });

    const updatedRecord = await updateVinylRecord.execute({
      id: record.id,
    });

    expect(updatedRecord.band.value).toBe('The Beatles');
    expect(updatedRecord.album.value).toBe('Abbey Road');
    expect(updatedRecord.year).toBe(1969);
    expect(updatedRecord.numberOfTracks).toBe(17);
    expect(updatedRecord.photo.url).toBe('https://example.com/abbey-road.jpg');
  });
});
