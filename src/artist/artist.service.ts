import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) { }

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const id = uuidv4();
    const artist = new ArtistEntity({
      id,
      name,
      grammy,
    })

    this.db.artists.push(artist)

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.isArtistExists('id', id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    const artist = this.isArtistExists('id', id);

    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    artist.name = name;
    artist.grammy = grammy;
    return artist;
    ;
  }

  remove(id: string) {
    const artistIndex = this.db.artists.findIndex(artist => artist.id === id);

    if (artistIndex === -1) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.db.users.splice(artistIndex, 1)
  }

  isArtistExists(param: 'id' | 'name', value: string) {
    return this.db.artists.find(user => user[param] === value);
  }
}
