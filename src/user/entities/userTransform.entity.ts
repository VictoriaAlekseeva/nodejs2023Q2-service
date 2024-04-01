import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserTransformEntity {
  id: string;
  login: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(userData: User) {
    this.id = userData.id;
    this.login = userData.login;
    this.password = userData.password;
    this.version = userData.version;
    this.createdAt = new Date(userData.createdAt).getTime();
    this.updatedAt = new Date(userData.updatedAt).getTime();
  }
}
