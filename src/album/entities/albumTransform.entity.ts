import { Album } from '@prisma/client';

export class AlbumTransformEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(albumData: Album) {
    this.id = albumData.id;
    this.name = albumData.name;
    this.year = albumData.year;
    this.artistId = albumData.artistId;
  }
}
