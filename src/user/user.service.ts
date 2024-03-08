import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User, UserEntity } from './entities/user.entity';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) { }

  create(createUserDto: CreateUserDto) {

    if (this.isUserExists('login', createUserDto.login)) {
      throw new HttpException('Login is occupied', HttpStatus.CONFLICT);
    }
    const id = uuidv4();
    const currentDate = Date.now();
    const user = new UserEntity({
      id,
      ...createUserDto,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate
    })

    this.db.users.push(user)

    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    return this.db.users.filter(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  isUserExists(param: 'id' | 'login', value: string) {
    return this.db.users.find(user => user[param] === value);
  }
}
