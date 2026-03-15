export interface Playlist {
  id: number;
  title: string;
  mood: string;
  image: string;
}

export const pastPlaylists: Playlist[] = [
  {
    id: 1,
    title: "Midnight Vibes",
    mood: "Chill",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Summer Drives",
    mood: "Energetic",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Deep Focus",
    mood: "Productive",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Rainy Afternoons",
    mood: "Melancholic",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Urban Nights",
    mood: "Moody",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
];
