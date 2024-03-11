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
}
