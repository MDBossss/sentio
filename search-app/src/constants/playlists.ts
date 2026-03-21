export interface Playlist {
  id: number;
  title: string;
  mood: string;
  image: string;
  songs?: Array<{
    title: string;
    artist: string;
    videoId: string;
    thumbnail: string;
  }>;
  prompt?: string;
  createdAt?: string;
}
