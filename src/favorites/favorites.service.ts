import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbEntities, DbService } from '../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  addTrack(id: string) {
    if (!this.isEntityExists(id, DbEntities.Tracks)) {
      throw new HttpException(
        "Track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.tracks.push(id);
  }

  addAlbum(id: string) {
    if (!this.isEntityExists(id, DbEntities.Albums)) {
      throw new HttpException(
        "Album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.albums.push(id);
  }

  addArtist(id: string) {
    if (!this.isEntityExists(id, DbEntities.Artists)) {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.artists.push(id);
  }

  findAll() {
    const favEntries = Object.entries(this.db.favorites);
    const resp = favEntries.reduce((acc, [key, value]) => {
      acc[key] = value.map((itemId) => {
        return this.db[key].find((entity) => entity.id === itemId);
      });

      return acc;
    }, {});

    return resp;
  }

  deleteTrack(id: string) {
    const deleteIndex = this.isEntityInFavs(id, DbEntities.Tracks);
    if (deleteIndex === -1) {
      throw new HttpException(
        "Track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.tracks.splice(deleteIndex, 1);
  }

  deleteAlbum(id: string) {
    const deleteIndex = this.isEntityInFavs(id, DbEntities.Albums);
    if (deleteIndex === -1) {
      throw new HttpException(
        "Album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.albums.splice(deleteIndex, 1);
  }

  deleteArtist(id: string) {
    const deleteIndex = this.isEntityInFavs(id, DbEntities.Artists);
    if (deleteIndex === -1) {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.artists.splice(deleteIndex, 1);
  }

  isEntityExists(id: string, entity: DbEntities) {
    switch (entity) {
      case DbEntities.Tracks:
        return this.db.tracks.find((item) => item.id === id);
      case DbEntities.Albums:
        return this.db.albums.find((item) => item.id === id);
      case DbEntities.Artists:
        return this.db.artists.find((item) => item.id === id);
      default:
        return null;
    }
  }

  isEntityInFavs(id: string, entity: DbEntities) {
    switch (entity) {
      case DbEntities.Tracks:
        return this.db.favorites.tracks.findIndex((item) => item === id);
      case DbEntities.Albums:
        return this.db.favorites.albums.findIndex((item) => item === id);
      case DbEntities.Artists:
        return this.db.favorites.artists.findIndex((item) => item === id);
      default:
        return null;
    }
  }
}
