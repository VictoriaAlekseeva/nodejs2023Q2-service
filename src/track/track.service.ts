import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private db: DbService) { }

  create(createTrackDto: CreateTrackDto) {
    // const { name, artistId, albumId, duration } = createTrackDto;

    const id = uuidv4();

    const track = new TrackEntity({
      id,
      ...createTrackDto
    });

    this.db.tracks.push(track);

    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.isTrackExists('id', id);

    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    const track = this.isTrackExists('id', id);

    if (!track) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex(track => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.db.tracks.splice(trackIndex, 1);
    this.db.favorites.tracks = this.db.favorites.tracks.filter(trackID => trackID !== id)
  }

  isTrackExists(param: 'id' | 'name', value: string) {
    return this.db.tracks.find(track => track[param] === value);
  }
}
