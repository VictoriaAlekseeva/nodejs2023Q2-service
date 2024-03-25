import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumTransformEntity } from './entities/albumTransform.entity';

@Injectable()
export class AlbumService {
  constructor(private db: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.db.album.create({ data: createAlbumDto });
    return newAlbum;
  }

  async findAll() {
    const getAllTracks = await this.db.album.findMany();
    return getAllTracks.map((album) => new AlbumTransformEntity(album));
  }

  async findOne(id: string) {
    const getAlbum = await this.db.album.findUnique({ where: { id } });
    if (!getAlbum) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return getAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);

    const updateAlbum = await this.db.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return updateAlbum;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.album.delete({ where: { id } });
  }
}
