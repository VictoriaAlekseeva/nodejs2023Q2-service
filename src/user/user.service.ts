import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserTransformEntity } from './entities/userTransform.entity';
import { DbService } from '../db/db.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const newUser = await this.db.user.create({ data: createUserDto });

    return new UserTransformEntity(newUser);
  }

  async findAll() {
    const getAllUsers = await this.db.user.findMany();
    return getAllUsers.map((user) => new UserTransformEntity(user));
  }

  async findOne(id: string) {
    const getUser = await this.db.user.findUnique({ where: { id } });

    if (!getUser) {
      throw new NotFoundException("User doesn't exist");
    }
    return new UserTransformEntity(getUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const userToUpdate = await this.db.user.findUnique({ where: { id } });

    if (!userToUpdate) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (userToUpdate.password !== oldPassword) {
      throw new HttpException("'Incorrect password'", HttpStatus.FORBIDDEN);
    }

    const updatedUser =  await this.db.user.update({
      where: { id },
      data: {
        password: newPassword,
        // updatedAt: new Date(),
        version: userToUpdate.version + 1,
      },
    });

    return new UserTransformEntity(updatedUser)
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.user.delete({ where: { id } });
  }
}
