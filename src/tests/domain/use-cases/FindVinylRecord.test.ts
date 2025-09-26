import { FindVinylRecord } from '../../../domain/use-cases/FindDenuncia';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterDenuncia';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('FindVinylRecord', () => {
  it('should find a vinyl record by id', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const findVinylRecord = new FindVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
    });

    const foundRecord = await findVinylRecord.execute({ id: record.id });

    expect(foundRecord).toBe(record);
  });

  it('should return null if the record is not found', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const findVinylRecord = new FindVinylRecord(vinylRecordRepository);

    const foundRecord = await findVinylRecord.execute({ id: '1' });

    expect(foundRecord).toBeNull();
  });
});
