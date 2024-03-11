import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null; // refers to Artist

  @ValidateIf((o) => o.albumId !== null)
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
