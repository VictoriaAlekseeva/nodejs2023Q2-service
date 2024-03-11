export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumEntity implements Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(albumData: Partial<AlbumEntity>) {
    this.id = albumData.id;
    this.name = albumData.name;
    this.year = albumData.year;
    this.artistId = this.artistId ? null : albumData.artistId;
  }
}
