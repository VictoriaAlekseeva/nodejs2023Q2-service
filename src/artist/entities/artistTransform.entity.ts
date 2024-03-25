import { Artist } from '@prisma/client';

export class ArtistTransformEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(artistData: Artist) {
    this.id = artistData.id;
    this.name = artistData.name;
    this.grammy = artistData.grammy;
  }
}
