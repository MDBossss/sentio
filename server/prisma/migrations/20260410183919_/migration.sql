-- CreateTable
CREATE TABLE "SharedSong" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "thumbnail" TEXT,
    "sharedPlaylistId" TEXT NOT NULL,
    CONSTRAINT "SharedSong_sharedPlaylistId_fkey" FOREIGN KEY ("sharedPlaylistId") REFERENCES "SharedPlaylist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SharedPlaylist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prompt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalCreatorId" TEXT NOT NULL,
    "originalPlaylistId" TEXT NOT NULL,
    "sharedByName" TEXT,
    "sharedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SharedPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SharedPlaylist_userId_idx" ON "SharedPlaylist"("userId");

-- CreateIndex
CREATE INDEX "SharedPlaylist_originalPlaylistId_idx" ON "SharedPlaylist"("originalPlaylistId");
