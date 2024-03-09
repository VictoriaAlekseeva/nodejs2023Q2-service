import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsString()
  artistId: string | null; // refers to Artist

  // @IsString()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
