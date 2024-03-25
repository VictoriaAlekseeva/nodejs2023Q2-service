import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistTransformEntity } from './entities/artistTransform.entity';

@Injectable()
export class ArtistService {
  constructor(private db: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.db.artist.create({ data: createArtistDto });

    return newArtist;
  }

  async findAll() {
    const getAllArtists = await this.db.artist.findMany();
    return getAllArtists.map((artist) => new ArtistTransformEntity(artist));
  }

  async findOne(id: string) {
    const getArtist = await this.db.artist.findUnique({ where: { id } });
    if (!getArtist) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }

    return new ArtistTransformEntity(getArtist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id)
    const updateArtist = await this.db.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return updateArtist;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.artist.delete({ where: { id } });
  }
}
