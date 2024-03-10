import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';

export const enum DbEntities {
  Users = 'users',
  Tracks = 'tracks',
  Artists = 'artists',
  Albums = 'albums'
}

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  artists: ArtistEntity[] = [];
  tracks: TrackEntity[] = [];
  albums: AlbumEntity[] = [];
}
