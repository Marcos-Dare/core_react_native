import { VinylRecord } from '../domain/entities/VinylRecord';
import { Name } from '../domain/value-objects/Descricao';
import { Photo } from '../domain/value-objects/Photo';

export class VinylRecordFactory {
  static create(params: {
    id?: string;
    band?: string;
    album?: string;
    year?: number;
    numberOfTracks?: number;
    photoUrl?: string;
  }): VinylRecord {
    return VinylRecord.create(
      params.id || Math.random().toString(),
      Name.create(params.band || 'The Beatles'),
      Name.create(params.album || 'Abbey Road'),
      params.year || 1969,
      params.numberOfTracks || 17,
      Photo.create(params.photoUrl || 'https://example.com/abbey-road.jpg')
    );
  }
}
