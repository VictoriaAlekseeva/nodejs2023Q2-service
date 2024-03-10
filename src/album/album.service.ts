import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) { }

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    const id = uuidv4();
    const album = new AlbumEntity({
      id,
      name,
      year,
      artistId,
    })

    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.isAlbumExists('id', id);
    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;

    const album = this.isAlbumExists('id', id);

    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(id: string) {
    const albumIndex = this.db.albums.findIndex(album => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.db.tracks.map(track => {
      if (track.albumId === id) track.albumId = null
    })

    this.db.albums.splice(albumIndex, 1);
  }

  isAlbumExists(param: 'id' | 'name', value: string) {
    return this.db.albums.find(album => album[param] === value);
  }
}
