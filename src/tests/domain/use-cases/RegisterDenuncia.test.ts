import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterDenuncia';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('RegisterVinylRecord', () => {
  it('should register a new vinyl record', async () => {
    const vinylRecordRepository = new MockVinylRecordRepository();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
    });

    expect(record).toBeDefined();
    expect(record.band.value).toBe('The Beatles');
    expect(record.album.value).toBe('Abbey Road');

    const foundRecord = await vinylRecordRepository.findById(record.id);
    expect(foundRecord).toBe(record);
  });
});
