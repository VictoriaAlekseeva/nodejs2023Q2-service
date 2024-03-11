export class Favorite {}

export interface Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesEntity implements Favorite {

  artists: string[] = []; // favorite artists ids
  albums: string[] = []; // favorite albums ids
  tracks: string[] = []; // favorite tracks ids

  // constructor(favoritesData: Partial<FavoritesEntity>) {
  //   this.artists = [...this.artists, ...favoritesData.artists];
  //   this.albums = [...this.albums, ...favoritesData.albums];
  //   this.tracks = [...this.tracks, ...favoritesData.tracks];
  // }
}
