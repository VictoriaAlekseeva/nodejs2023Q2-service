import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    if (artistId && !this.isArtistExists(artistId)) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (albumId && !this.isAlbumExists(albumId)) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    const id = uuidv4();

    const track = new TrackEntity({
      id,
      ...createTrackDto,
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
    const { artistId, albumId } = updateTrackDto;

    let track = this.isTrackExists('id', id);

    if (!track) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (artistId && !this.isArtistExists(artistId)) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (albumId && !this.isAlbumExists(albumId)) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    track = {
      ...track,
      ...updateTrackDto,
    };

    return track;
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.db.tracks.splice(trackIndex, 1);
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackID) => trackID !== id,
    );
  }

  isTrackExists(param: 'id' | 'name', value: string) {
    return this.db.tracks.find((track) => track[param] === value);
  }

  isArtistExists(id: string) {
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    // }

    // return artist

    return this.db.artists.find((artist) => artist.id === id);
  }

  isAlbumExists(id: string) {
    // const album = this.db.albums.find((album) => album.id === id)

    // if (!album) {
    //   throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    // }

    // return album

    return this.db.albums.find((album) => album.id === id);
  }
}
