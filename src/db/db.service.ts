import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';

export const enum DbEntities {
  Users = 'users',
  Tracks = 'tracks',
  Artinsts = 'artists',
  Albums = 'albums'
}

@Injectable()
export class DbService {
  users: UserEntity[] = [];

}
