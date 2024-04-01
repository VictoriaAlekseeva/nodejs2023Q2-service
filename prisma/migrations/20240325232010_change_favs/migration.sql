/*
  Warnings:

  - You are about to drop the `_FavoriteToAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoriteToAlbum" DROP CONSTRAINT "_FavoriteToAlbum_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToAlbum" DROP CONSTRAINT "_FavoriteToAlbum_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToArtist" DROP CONSTRAINT "_FavoriteToArtist_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToArtist" DROP CONSTRAINT "_FavoriteToArtist_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToTrack" DROP CONSTRAINT "_FavoriteToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToTrack" DROP CONSTRAINT "_FavoriteToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[];

-- DropTable
DROP TABLE "_FavoriteToAlbum";

-- DropTable
DROP TABLE "_FavoriteToArtist";

-- DropTable
DROP TABLE "_FavoriteToTrack";
