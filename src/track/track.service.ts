import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackTransformEntity } from './entities/trackTransform.entity';

@Injectable()
export class TrackService {
  constructor(private db: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.db.track.create({ data: createTrackDto });

    return newTrack;
  }

  async findAll() {
    return await this.db.track.findMany();
  }

  async findOne(id: string) {
    const getTrack = await this.db.track.findUnique({ where: { id } });
    if (!getTrack) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }

    return new TrackTransformEntity(getTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    const updateTrack = await this.db.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return updateTrack;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.track.delete({ where: { id } });
  }
}
