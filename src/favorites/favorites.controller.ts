import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.addTrack(id);
  }
  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.addAlbum(id);
  }
  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.deleteTrack(id);
  }
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
