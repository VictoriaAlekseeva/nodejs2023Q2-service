import { Injectable } from '@nestjs/common';
import { UserTransformEntity } from '../user/entities/userTransform.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';

export enum DbEntities {
  Users = 'users',
  Tracks = 'tracks',
  Artists = 'artists',
  Albums = 'albums',
}

@Injectable()
export class DbService {
  users: UserTransformEntity[] = [];
  artists: ArtistEntity[] = [];
  tracks: TrackEntity[] = [];
  albums: AlbumEntity[] = [];
  favorites: FavoritesEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
