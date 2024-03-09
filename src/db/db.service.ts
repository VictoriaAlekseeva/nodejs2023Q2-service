import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

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

}
