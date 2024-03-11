import { Exclude } from 'class-transformer';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class UserEntity implements User {
  id: string;
  login: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(userData: Partial<UserEntity>) {
    this.id = userData.id;
    this.login = userData.login;
    this.password = userData.password;
    this.version = userData.version;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }
}
