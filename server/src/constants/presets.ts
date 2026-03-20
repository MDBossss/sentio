/**
 * Presets organized by genre and time of day
 * Structure: presets[genre][timeOfDay] = array of preset objects
 * Each preset has emoji and text
 */

export interface Preset {
  emoji: string;
  text: string; // Display title
  description: string; // Prompt to send to OpenAI
}

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export const genrePresets: Record<string, Record<TimeOfDay, Preset[]>> = {
  Pop: {
    morning: [
      {
        emoji: "☀️",
        text: "Pop morning energy",
        description: "Upbeat pop tracks with energetic vibes to start your day",
      },
      {
        emoji: "🌤️",
        text: "Chart toppers wake-up",
        description:
          "Popular chart-topping pop hits for a fresh morning wake-up",
      },
      {
        emoji: "🍃",
        text: "Main pop calm start",
        description: "Smooth mainstream pop to ease into your morning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Pop hits midday energy",
        description: "High-energy pop hits to boost your productivity at noon",
      },
      {
        emoji: "🏙️",
        text: "Urban pop stroll",
        description:
          "Contemporary urban pop for an afternoon walk through the city",
      },
      {
        emoji: "🎧",
        text: "Pop productive flow",
        description: "Catchy pop tracks to keep you focused and productive",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour pop chill",
        description: "Smooth, relaxing pop songs as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Smooth pop lounge",
        description: "Sophisticated pop lounge vibes for evening relaxation",
      },
      {
        emoji: "🧠",
        text: "Pop deep dive",
        description: "Deep cuts from popular pop artists for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Chill pop midnight",
        description: "Laid-back pop for a relaxing late-night chill session",
      },
      {
        emoji: "🌧️",
        text: "Rainy pop vibes",
        description: "Moody pop tracks perfect for a rainy night",
      },
      {
        emoji: "🖤",
        text: "Late night pop slowburn",
        description: "Slow-burning pop ballads for late-night introspection",
      },
    ],
  },
  Rock: {
    morning: [
      {
        emoji: "☀️",
        text: "Rock morning charge",
        description: "Energetic rock tracks to power through your morning",
      },
      {
        emoji: "🌤️",
        text: "Classic rock sunrise",
        description: "Classic rock masterpieces for a nostalgic sunrise",
      },
      {
        emoji: "🍃",
        text: "Gentle rock wake-up",
        description: "Mellow rock songs to gently wake your senses",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Rock midday power",
        description: "Raw, powerful rock to fuel your afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban rock edge",
        description: "Modern rock with an urban edge for city vibes",
      },
      {
        emoji: "🎧",
        text: "Rock focus highway",
        description: "Driving rock tracks to keep you focused and motivated",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour rock",
        description: "Melodic rock as the day winds down",
      },
      {
        emoji: "🎷",
        text: "Rock lounge sessions",
        description: "Sophisticated rock for evening relaxation",
      },
      {
        emoji: "🧠",
        text: "Deep rock exploration",
        description: "Deeper cuts from rock artists for discovery",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight rock dreams",
        description: "Introspective rock ballads for late-night reflection",
      },
      {
        emoji: "🌧️",
        text: "Rainy night rock",
        description: "Moody rock perfect for a rainy evening",
      },
      {
        emoji: "🖤",
        text: "Dark rock intensity",
        description: "Dark, heavy rock with intensity and depth",
      },
    ],
  },
  "Hip-Hop": {
    morning: [
      {
        emoji: "☀️",
        text: "Hip-hop morning beats",
        description: "Upbeat hip-hop and rap tracks to energize your morning",
      },
      {
        emoji: "🌤️",
        text: "Sunny rap start",
        description: "Sunny, positive hip-hop vibes to start fresh",
      },
      {
        emoji: "🍃",
        text: "Chill hop sunrise",
        description: "Chill hop beats for a relaxed morning atmosphere",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Hip-hop midday hype",
        description: "High-energy hip-hop to keep you hyped all afternoon",
      },
      {
        emoji: "🏙️",
        text: "City rap flow",
        description: "Urban hip-hop with city vibes and flow",
      },
      {
        emoji: "🎧",
        text: "Hip-hop grind mode",
        description: "Motivational hip-hop to fuel your grind",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour hip-hop",
        description: "Smooth hip-hop as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Smooth rap nights",
        description: "Smooth, soulful rap for evening vibes",
      },
      {
        emoji: "🧠",
        text: "Conscious hip-hop",
        description: "Conscious, lyrical hip-hop with substance",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Late night hip-hop",
        description: "Set a vibe with late-night hip-hop beats",
      },
      {
        emoji: "🌧️",
        text: "Rainy lo-fi hour",
        description: "Lo-fi hip-hop beats perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Trap midnight vibes",
        description: "Trap beats for a dark, intense midnight session",
      },
    ],
  },
  "R&B": {
    morning: [
      {
        emoji: "☀️",
        text: "R&B smooth morning",
        description: "Smooth R&B vibes to start your day feeling good",
      },
      {
        emoji: "🌤️",
        text: "Soulful wake-up",
        description: "Soulful R&B tracks to awaken your spirit",
      },
      {
        emoji: "🍃",
        text: "R&B soft start",
        description: "Soft R&B melodies for a gentle morning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "R&B afternoon groove",
        description: "Groovy R&B to elevate your afternoon energy",
      },
      {
        emoji: "🏙️",
        text: "Urban soul stroll",
        description: "Urban soul and R&B for city exploration",
      },
      {
        emoji: "🎧",
        text: "R&B productive vibes",
        description: "Feel-good R&B to keep you productive",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour R&B",
        description: "Golden hour R&B for relaxation",
      },
      {
        emoji: "🎷",
        text: "Smooth soul lounge",
        description: "Smooth soul lounge sounds for evening peace",
      },
      {
        emoji: "🧠",
        text: "Deep R&B journey",
        description: "Deep, soulful R&B for introspection",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight R&B romance",
        description: "Romantic R&B for intimate midnight moments",
      },
      {
        emoji: "🌧️",
        text: "Rainy soul night",
        description: "Soulful R&B perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night soul drift",
        description: "Drift away with late-night soul and R&B",
      },
    ],
  },
  Jazz: {
    morning: [
      {
        emoji: "☀️",
        text: "Jazz morning awakening",
        description: "Smooth jazz to gently awaken and refresh",
      },
      {
        emoji: "🌤️",
        text: "Classic jazz sunrise",
        description: "Classic jazz standards for a sophisticated morning",
      },
      {
        emoji: "🍃",
        text: "Smooth jazz start",
        description: "Mellow smooth jazz to begin your day peacefully",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Upbeat jazz afternoon",
        description: "Upbeat, energetic jazz to elevate your afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban jazz walk",
        description: "Urban jazz with contemporary beats",
      },
      {
        emoji: "🎧",
        text: "Jazz focus sessions",
        description: "Focus-enhancing jazz for deep concentration",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour jazz",
        description: "Sophisticated jazz as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Jazz lounge nights",
        description: "Lounge jazz for relaxed evening vibes",
      },
      {
        emoji: "🧠",
        text: "Modal jazz exploration",
        description: "Complex modal jazz for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight jazz dreams",
        description: "Dreamy jazz for late-night introspection",
      },
      {
        emoji: "🌧️",
        text: "Rainy evening jazz",
        description: "Atmospheric jazz perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night jazz noir",
        description: "Dark, moody jazz noir for midnight hours",
      },
    ],
  },
  Classical: {
    morning: [
      {
        emoji: "☀️",
        text: "Classical morning light",
        description: "Uplifting classical pieces to brighten your morning",
      },
      {
        emoji: "🌤️",
        text: "Symphonic awakening",
        description: "Grand symphonies to awaken your soul",
      },
      {
        emoji: "🍃",
        text: "Gentle classics start",
        description: "Gentle classical pieces for a peaceful beginning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Uplifting classical energy",
        description: "Energetic classical to fuel your afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban classical pace",
        description: "Modern classical for contemporary living",
      },
      {
        emoji: "🎧",
        text: "Classical focus sessions",
        description: "Concentrated classical for deep focus",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour concertos",
        description: "Beautiful concertos for evening contemplation",
      },
      {
        emoji: "🎷",
        text: "Classical evening suites",
        description: "Elegant suites for refined evening enjoyment",
      },
      {
        emoji: "🧠",
        text: "Deep classical immersion",
        description: "Complex classical for deep listening",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight classical dreams",
        description: "Dreamy classical for midnight reflection",
      },
      {
        emoji: "🌧️",
        text: "Rainy night nocturnes",
        description: "Nocturnes perfect for rainy evenings",
      },
      {
        emoji: "🖤",
        text: "Dark classical passages",
        description: "Dark, intense classical compositions",
      },
    ],
  },
  Electronic: {
    morning: [
      {
        emoji: "☀️",
        text: "Electronic sunrise spark",
        description: "Energetic electronic beats to spark your morning",
      },
      {
        emoji: "🌤️",
        text: "Synth morning wake",
        description: "Synth-driven tracks for an electric wake-up",
      },
      {
        emoji: "🍃",
        text: "Ambient electronic start",
        description: "Ambient electronic for a calm start",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Electronic midday rush",
        description: "High-energy electronic to match the pace",
      },
      {
        emoji: "🏙️",
        text: "Synthwave city drive",
        description: "Synthwave vibes for urban exploration",
      },
      {
        emoji: "🎧",
        text: "Electronic flow state",
        description: "Electronic beats for optimal flow",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour synths",
        description: "Warm synthwork as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Electronic lounge set",
        description: "Sophisticated electronic lounge vibes",
      },
      {
        emoji: "🧠",
        text: "Techno deep dive",
        description: "Deep techno for immersive listening",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight electronic pulse",
        description: "Pulsing electronic for midnight vibes",
      },
      {
        emoji: "🌧️",
        text: "Rainy synth night",
        description: "Atmospheric synth for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Dark electronic ambient",
        description: "Dark, moody electronic atmosphere",
      },
    ],
  },
  Country: {
    morning: [
      {
        emoji: "☀️",
        text: "Country morning sunrise",
        description: "Warm country vibes for a fresh morning",
      },
      {
        emoji: "🌤️",
        text: "Acoustic country wake",
        description: "Acoustic country to gently wake",
      },
      {
        emoji: "🍃",
        text: "Folk country start",
        description: "Folk-influenced country for a calm start",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Country midday vibes",
        description: "Upbeat country to keep energy going",
      },
      {
        emoji: "🏙️",
        text: "Urban country feel",
        description: "Contemporary country with urban flair",
      },
      {
        emoji: "🎧",
        text: "Country roadtrip mode",
        description: "Road-trip country vibes all afternoon",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour country",
        description: "Sunset country ballads and melodies",
      },
      {
        emoji: "🎷",
        text: "Country evening stories",
        description: "Storytelling country for evening reflection",
      },
      {
        emoji: "🧠",
        text: "Country soul journey",
        description: "Soulful country for deep connection",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight country nights",
        description: "Late-night country heartfelt moments",
      },
      {
        emoji: "🌧️",
        text: "Rainy country ballads",
        description: "Emotional country ballads for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night country heart",
        description: "Country straight from the heart after midnight",
      },
    ],
  },
  Latin: {
    morning: [
      {
        emoji: "☀️",
        text: "Latin morning sunrise",
        description: "Vibrant Latin rhythms to energize your morning",
      },
      {
        emoji: "🌤️",
        text: "Sunny Latin rhythm",
        description: "Sunny, joyful Latin beats to start your day",
      },
      {
        emoji: "🍃",
        text: "Calm Latin start",
        description: "Laid-back Latin vibes for peaceful morning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Latin midday energy",
        description: "Energetic Latin to keep pace with afternoon",
      },
      {
        emoji: "🏙️",
        text: "Salsa city groove",
        description: "Salsa and urban Latin for city vibes",
      },
      {
        emoji: "🎧",
        text: "Latin focus beats",
        description: "Rhythmic Latin to fuel your focus",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour Latin nights",
        description: "Smooth Latin as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Smooth Latin lounge",
        description: "Sophisticated Latin lounge vibes",
      },
      {
        emoji: "🧠",
        text: "Bossa nova journey",
        description: "Sophisticated bossa nova for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight Latin passion",
        description: "Passionate Latin for intimate nights",
      },
      {
        emoji: "🌧️",
        text: "Rainy Latin vibes",
        description: "Romantic Latin perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night reggaeton",
        description: "Reggaeton and urban Latin after midnight",
      },
    ],
  },
  "K-pop": {
    morning: [
      {
        emoji: "☀️",
        text: "K-pop morning energy",
        description: "Energetic K-pop tracks to power your morning",
      },
      {
        emoji: "🌤️",
        text: "Sunshine K-pop start",
        description: "Bright, positive K-pop for sunny mornings",
      },
      {
        emoji: "🍃",
        text: "Soft K-pop wake-up",
        description: "Gentle K-pop for a peaceful wake-up",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "K-pop midday hype",
        description: "Hyped K-pop to keep energy high",
      },
      {
        emoji: "🏙️",
        text: "Urban K-pop groove",
        description: "Urban K-pop with contemporary groove",
      },
      {
        emoji: "🎧",
        text: "K-pop focus flow",
        description: "Smooth K-pop for optimal focus",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour K-pop",
        description: "Smooth K-pop as evening sets in",
      },
      {
        emoji: "🎷",
        text: "K-pop evening vibes",
        description: "Relaxed K-pop for evening enjoyment",
      },
      {
        emoji: "🧠",
        text: "K-pop soul moments",
        description: "Emotive K-pop for deep connection",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight K-pop dreams",
        description: "Dreamy K-pop for late-night reflection",
      },
      {
        emoji: "🌧️",
        text: "Rainy K-pop night",
        description: "Atmospheric K-pop perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night ballads",
        description: "K-pop ballads for emotional midnight moments",
      },
    ],
  },
  Indie: {
    morning: [
      {
        emoji: "☀️",
        text: "Indie morning rise",
        description: "Indie tracks to rise and greet the morning",
      },
      {
        emoji: "🌤️",
        text: "Indie folk wake-up",
        description: "Folk-indie blend for gentle awakening",
      },
      {
        emoji: "🍃",
        text: "Soft indie start",
        description: "Soft indie vibes for peaceful start",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Indie afternoon energy",
        description: "Energetic indie to fuel your afternoon",
      },
      {
        emoji: "🏙️",
        text: "Alternative indie stroll",
        description: "Alternative indie for urban exploration",
      },
      {
        emoji: "🎧",
        text: "Indie creative flow",
        description: "Creative indie to spark inspiration",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour indie",
        description: "Indie melodies as sun sets",
      },
      {
        emoji: "🎷",
        text: "Indie lounge sessions",
        description: "Indie lounge for evening relaxation",
      },
      {
        emoji: "🧠",
        text: "Indie deep exploration",
        description: "Deep indie cuts for discovery",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight indie dreams",
        description: "Dreamy indie for late-night thoughts",
      },
      {
        emoji: "🌧️",
        text: "Rainy indie night",
        description: "Moody indie perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night indie slow",
        description: "Slow, introspective indie after dark",
      },
    ],
  },
  Metal: {
    morning: [
      {
        emoji: "☀️",
        text: "Metal morning charge",
        description: "Powerful metal to charge your morning",
      },
      {
        emoji: "🌤️",
        text: "Uplifting metal wake",
        description: "Uplifting metal to energize and awaken",
      },
      {
        emoji: "🍃",
        text: "Progressive metal start",
        description: "Progressive metal for a thoughtful beginning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Metal midday power",
        description: "Raw metal power through the afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban metal edge",
        description: "Contemporary metal with urban edge",
      },
      {
        emoji: "🎧",
        text: "Metal intensity mode",
        description: "Intense metal to push your limits",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour metal",
        description: "Epic metal as the sun sets",
      },
      {
        emoji: "🎷",
        text: "Metal lounge vibes",
        description: "Sophisticated metal for evening",
      },
      {
        emoji: "🧠",
        text: "Metal mind journey",
        description: "Complex metal for deep thinking",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight metal nights",
        description: "Late-night metal for dark moments",
      },
      {
        emoji: "🌧️",
        text: "Rainy heavy metal",
        description: "Heavy metal perfect for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Dark metal intensity",
        description: "Dark, intense metal after midnight",
      },
    ],
  },
  Soul: {
    morning: [
      {
        emoji: "☀️",
        text: "Soul morning awakening",
        description: "Soulful tracks to awaken your spirit",
      },
      {
        emoji: "🌤️",
        text: "Soulful sunrise",
        description: "Uplifting soul for a bright sunrise",
      },
      {
        emoji: "🍃",
        text: "Gentle soul start",
        description: "Gentle soul for peaceful mornings",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Soul midday groove",
        description: "Groovy soul to elevate afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban soul stroll",
        description: "Urban soul for city exploration",
      },
      {
        emoji: "🎧",
        text: "Soul productive mode",
        description: "Feel-good soul to keep productive",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour soul",
        description: "Golden hour soul for relaxation",
      },
      {
        emoji: "🎷",
        text: "Soul lounge nights",
        description: "Smooth soul lounge vibes",
      },
      {
        emoji: "🧠",
        text: "Deep soul journey",
        description: "Deep soul for introspection",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight soul romance",
        description: "Romantic soul for intimate moments",
      },
      {
        emoji: "🌧️",
        text: "Rainy soul night",
        description: "Soulful tracks for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night soul drift",
        description: "Drift away with soulful sounds",
      },
    ],
  },
  Reggae: {
    morning: [
      {
        emoji: "☀️",
        text: "Reggae morning light",
        description: "Bright reggae to start your day",
      },
      {
        emoji: "🌤️",
        text: "Sunny reggae start",
        description: "Sunny reggae vibes for morning joy",
      },
      {
        emoji: "🍃",
        text: "Calm reggae vibes",
        description: "Calm reggae for peaceful mornings",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Reggae midday energy",
        description: "Energetic reggae through the day",
      },
      {
        emoji: "🏙️",
        text: "Urban reggae groove",
        description: "Urban reggae with modern groove",
      },
      {
        emoji: "🎧",
        text: "Reggae chill mode",
        description: "Chill reggae for relaxation",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour reggae",
        description: "Sunset reggae for evening peace",
      },
      {
        emoji: "🎷",
        text: "Reggae evening paradise",
        description: "Paradise reggae vibes for evening",
      },
      {
        emoji: "🧠",
        text: "Reggae soul journey",
        description: "Soulful reggae for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight reggae vibes",
        description: "Late-night reggae rhythms",
      },
      {
        emoji: "🌧️",
        text: "Rainy reggae night",
        description: "Moody reggae for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night reggae drift",
        description: "Drift with reggae after midnight",
      },
    ],
  },
  Folk: {
    morning: [
      {
        emoji: "☀️",
        text: "Folk morning awakening",
        description: "Folk tunes to awaken your spirit",
      },
      {
        emoji: "🌤️",
        text: "Acoustic folk sunrise",
        description: "Acoustic folk for a gentle sunrise",
      },
      {
        emoji: "🍃",
        text: "Gentle folk start",
        description: "Gentle folk for peaceful mornings",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Folk afternoon energy",
        description: "Energetic folk to fuel afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban folk walk",
        description: "Contemporary folk for urban stroll",
      },
      {
        emoji: "🎧",
        text: "Folk focus sessions",
        description: "Focused folk for concentration",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour folk stories",
        description: "Storytelling folk as sun sets",
      },
      {
        emoji: "🎷",
        text: "Folk evening campfire",
        description: "Campfire folk for evening gathering",
      },
      {
        emoji: "🧠",
        text: "Folk soul exploration",
        description: "Soul-searching folk for reflection",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight folk dreams",
        description: "Dreamy folk for late-night thoughts",
      },
      {
        emoji: "🌧️",
        text: "Rainy folk night",
        description: "Folk perfect for rainy evenings",
      },
      {
        emoji: "🖤",
        text: "Late night folk ballads",
        description: "Folk ballads for emotional nights",
      },
    ],
  },
  Ambient: {
    morning: [
      {
        emoji: "☀️",
        text: "Ambient peaceful morning",
        description: "Peaceful ambient to begin meditation",
      },
      {
        emoji: "🌤️",
        text: "Floating ambient start",
        description: "Floating ambient for dreamy mornings",
      },
      {
        emoji: "🍃",
        text: "Serene ambient wake",
        description: "Serene ambient for gentle awakening",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Ambient meditative focus",
        description: "Meditative ambient for focus",
      },
      {
        emoji: "🏙️",
        text: "Urban ambient space",
        description: "Urban ambient for work or study",
      },
      {
        emoji: "🎧",
        text: "Ambient flow state",
        description: "Ambient to achieve flow state",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour ambient",
        description: "Golden hour ambient for tranquility",
      },
      {
        emoji: "🎷",
        text: "Atmospheric ambient nights",
        description: "Atmospheric ambient for evening peace",
      },
      {
        emoji: "🧠",
        text: "Ambient deep immersion",
        description: "Deep ambient for meditation",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight ambient dreams",
        description: "Dreamy ambient for midnight rest",
      },
      {
        emoji: "🌧️",
        text: "Rainy ambient soundscape",
        description: "Ambient soundscape for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Dark ambient atmosphere",
        description: "Dark ambient for introspection",
      },
    ],
  },
  Blues: {
    morning: [
      {
        emoji: "☀️",
        text: "Blues morning light",
        description: "Uplifting blues to start your day",
      },
      {
        emoji: "🌤️",
        text: "Blues sunrise energy",
        description: "Energetic blues for bright mornings",
      },
      {
        emoji: "🍃",
        text: "Gentle blues start",
        description: "Gentle blues for peaceful start",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Blues midday groove",
        description: "Groovy blues through the afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban blues stroll",
        description: "Urban blues for city vibes",
      },
      {
        emoji: "🎧",
        text: "Blues focus mode",
        description: "Blues to keep you focused",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour blues",
        description: "Smooth blues as sun sets",
      },
      {
        emoji: "🎷",
        text: "Smooth blues lounge",
        description: "Smooth blues lounge vibes",
      },
      {
        emoji: "🧠",
        text: "Deep blues journey",
        description: "Deep blues for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight blues nights",
        description: "Late-night blues for reflection",
      },
      {
        emoji: "🌧️",
        text: "Rainy blues night",
        description: "Moody blues for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night slow blues",
        description: "Slow blues after midnight",
      },
    ],
  },
  Disco: {
    morning: [
      {
        emoji: "☀️",
        text: "Disco morning party",
        description: "Upbeat disco to start your day",
      },
      {
        emoji: "🌤️",
        text: "Sunny disco start",
        description: "Sunny, joyful disco for mornings",
      },
      {
        emoji: "🍃",
        text: "Uplifting disco wake",
        description: "Uplifting disco for gentle wake-up",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Disco midday energy",
        description: "High-energy disco all afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban disco groove",
        description: "Urban disco for city groove",
      },
      {
        emoji: "🎧",
        text: "Disco dance mode",
        description: "Disco to keep you dancing",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour disco",
        description: "Disco as sun sets",
      },
      {
        emoji: "🎷",
        text: "Disco party nights",
        description: "Party disco for evening fun",
      },
      {
        emoji: "🧠",
        text: "Disco soul journey",
        description: "Soulful disco exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight disco fever",
        description: "Late-night disco fever",
      },
      {
        emoji: "🌧️",
        text: "Rainy disco night",
        description: "Fun disco for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night disco vibes",
        description: "Disco vibes after midnight",
      },
    ],
  },
  "Top-40": {
    morning: [
      {
        emoji: "☀️",
        text: "Top 40 morning surge",
        description: "Chart-topping hits to surge your morning",
      },
      {
        emoji: "🌤️",
        text: "Chart toppers wake-up",
        description: "Popular chart hits for wake-up",
      },
      {
        emoji: "🍃",
        text: "Main stream calm start",
        description: "Mainstream hits for calm start",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Top 40 midday hype",
        description: "Hyped chart hits for afternoon",
      },
      {
        emoji: "🏙️",
        text: "Urban top hits groove",
        description: "Urban chart hits groove",
      },
      {
        emoji: "🎧",
        text: "Top 40 focus flow",
        description: "Current hits for focus",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour top hits",
        description: "Top hits as sun sets",
      },
      {
        emoji: "🎷",
        text: "Chart lounge treats",
        description: "Chart lounge for evening",
      },
      {
        emoji: "🧠",
        text: "Top 40 deep dive",
        description: "Chart deep cuts for exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight chart toppers",
        description: "Late-night chart hits",
      },
      {
        emoji: "🌧️",
        text: "Rainy chart night",
        description: "Chart hits for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night hit ballads",
        description: "Chart ballads after midnight",
      },
    ],
  },
  Podcast: {
    morning: [
      {
        emoji: "☀️",
        text: "Podcast morning listen",
        description: "Inspiring podcast for morning motivation",
      },
      {
        emoji: "🌤️",
        text: "Inspiring podcast start",
        description: "Uplifting podcast to start your day",
      },
      {
        emoji: "🍃",
        text: "Calm podcast moment",
        description: "Relaxing podcast for peaceful morning",
      },
    ],
    afternoon: [
      {
        emoji: "⚡",
        text: "Podcast midday focus",
        description: "Engaging podcast for afternoon focus",
      },
      {
        emoji: "🏙️",
        text: "Urban podcast stroll",
        description: "Urban podcast for city walks",
      },
      {
        emoji: "🎧",
        text: "Podcast learning mode",
        description: "Educational podcast for learning",
      },
    ],
    evening: [
      {
        emoji: "🌇",
        text: "Golden hour podcast",
        description: "Podcast as evening begins",
      },
      {
        emoji: "🎷",
        text: "Podcast evening tales",
        description: "Storytelling podcast for evening",
      },
      {
        emoji: "🧠",
        text: "Podcast deep dive",
        description: "In-depth podcast exploration",
      },
    ],
    night: [
      {
        emoji: "🌙",
        text: "Midnight podcast dreams",
        description: "Contemplative podcast for late night",
      },
      {
        emoji: "🌧️",
        text: "Rainy podcast stories",
        description: "Storytelling podcast for rainy nights",
      },
      {
        emoji: "🖤",
        text: "Late night podcast drift",
        description: "Drift away with podcast",
      },
    ],
  },
};
