export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class TrackEntity implements Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(trackData: Partial<TrackEntity>) {
    this.id = trackData.id;
    this.name = trackData.name;
    this.artistId = trackData.artistId ? trackData.artistId : null ;
    this.albumId = trackData.albumId ? trackData.albumId : null;
    this.duration = trackData.duration;
  }
}
