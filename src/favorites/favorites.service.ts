import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private db: PrismaService) { }

  async addTrack(id: string) {

    const track = await this.db.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    const findFav = await this.db.favorite.findFirst();

    if (!findFav) {
      await this.db.favorite.create({
        data: {
          tracks: [id],
        },
      });
    } else {
      const checkTracks = findFav.tracks.includes(id);
      if (!checkTracks) {
        await this.db.favorite.update({
          where: { favoriteId: findFav.favoriteId },
          data: { tracks: { set: [...findFav.tracks, id] } },
        });
      } else {
        throw new HttpException(`Track is already exist in favorites`,
          HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }

  async addAlbum(id: string) {
    const album = await this.db.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    const findFav = await this.db.favorite.findFirst();

    if (!findFav) {
      await this.db.favorite.create({
        data: {
          albums: [id],
        },
      });
    } else {
      const checkAlbums = findFav.albums.includes(id);
      if (!checkAlbums) {
        await this.db.favorite.update({
          where: { favoriteId: findFav.favoriteId },
          data: { albums: { set: [...findFav.albums, id] } },
        });
      } else {
        throw new HttpException(`Album already exists in favorites`,
          HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }

  async addArtist(id: string) {

    const artist = await this.db.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    const findFav = await this.db.favorite.findFirst();

    if (!findFav) {
      await this.db.favorite.create({
        data: {
          artists: [id],
        },
      });
    } else {
      const checkArtist = findFav.artists.includes(id);
      if (!checkArtist) {
        await this.db.favorite.update({
          where: { favoriteId: findFav.favoriteId },
          data: { artists: { set: [...findFav.artists, id] } },
        });
      } else {
        throw new HttpException(`Artist already exists in favorites`, HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }

  async findAll() {
    const findFav = await this.db.favorite.findFirst();
    if (!findFav) return { artists: [], albums: [], tracks: [] }

    const tracks = await this.db.track.findMany({
      where: { id: { in: findFav.tracks } },
    });

    const albums = await this.db.album.findMany({
      where: { id: { in: findFav.albums } },
    });

    const artists = await this.db.artist.findMany({
      where: { id: { in: findFav.artists } },
    });

    const resData = { tracks, albums, artists };

    return resData;
  }

  async deleteTrack(id: string) {
    const favorite = await this.db.favorite.findFirst();

    const findTrack = favorite.tracks.includes(id);
    if (!findTrack) {
      throw new HttpException("Track doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.db.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        tracks: {
          set: favorite.tracks.filter((trackId) => trackId !== id),
        },
      },
    });
  }

  async deleteAlbum(id: string) {
    const favorite = await this.db.favorite.findFirst();

    const findAlbum = favorite.albums.includes(id);
    if (!findAlbum) {
      throw new HttpException("Album doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.db.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        albums: {
          set: favorite.albums.filter((albumId) => albumId !== id),
        },
      },
    });
  }

  async deleteArtist(id: string) {
    const favorite = await this.db.favorite.findFirst();

    const findArtist = favorite.artists.includes(id);
    if (!favorite) {
      throw new HttpException("Artist doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.db.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        artists: {
          set: favorite.artists.filter((artistId) => artistId !== id),
        },
      },
    });
  }

}
