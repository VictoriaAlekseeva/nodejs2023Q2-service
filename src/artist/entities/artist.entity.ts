export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class ArtistEntity implements Artist {

  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(artistData: Partial<ArtistEntity>) {
    this.id = artistData.id;
    this.name = artistData.name;
    this.grammy = artistData.grammy;
  }

}
