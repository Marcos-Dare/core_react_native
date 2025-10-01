import { VinylRecordFactory } from '../../factories/DenunciaFactory';

describe('VinylRecordFactory', () => {
  it('should create a vinyl record with default values', () => {
    const record = VinylRecordFactory.create({});
    expect(record).toBeDefined();
    expect(record.band.value).toBe('The Beatles');
    expect(record.album.value).toBe('Abbey Road');
  });

  it('should create a vinyl record with provided values', () => {
    const record = VinylRecordFactory.create({
      band: 'Pink Floyd',
      album: 'The Dark Side of the Moon',
    });
    expect(record).toBeDefined();
    expect(record.band.value).toBe('Pink Floyd');
    expect(record.album.value).toBe('The Dark Side of the Moon');
  });
});
