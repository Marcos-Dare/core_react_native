import { DeleteVinylRecord } from '../../../domain/use-cases/DeleteVinylRecord';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterDenuncia';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('DeleteVinylRecord', () => {
  it('should delete a vinyl record', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const deleteVinylRecord = new DeleteVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
    });

    await deleteVinylRecord.execute({ id: record.id });

    const foundRecord = await vinylRecordRepository.findById(record.id);

    expect(foundRecord).toBeNull();
  });

  it('should throw an error if the vinyl record is not found', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const deleteVinylRecord = new DeleteVinylRecord(vinylRecordRepository);

    await expect(deleteVinylRecord.execute({ id: '1' })).rejects.toThrow('Vinyl record not found');
  });
});
