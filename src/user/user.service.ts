import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (this.isUserExists('login', login)) {
      throw new HttpException('Login is occupied', HttpStatus.CONFLICT);
    }

    const id = uuidv4();
    const currentDate = Date.now();
    const user = new UserEntity({
      id,
      login,
      password,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    this.db.users.push(user);

    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.isUserExists('id', id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const user = this.isUserExists('id', id);

    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return user;
  }

  remove(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.db.users.splice(userIndex, 1);
  }

  isUserExists(param: 'id' | 'login', value: string) {
    return this.db.users.find((user) => user[param] === value);
  }
}
