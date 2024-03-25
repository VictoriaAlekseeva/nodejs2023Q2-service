import { Track } from '@prisma/client';

export class TrackTransformEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(trackData: Track) {
    this.id = trackData.id;
    this.name = trackData.name;
    this.artistId = trackData.artistId;
    this.albumId = trackData.albumId;
    this.duration = trackData.duration;
  }
}
