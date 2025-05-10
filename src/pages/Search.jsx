import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [bgColor, setBgColor] = useState("bg-black");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const categories = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "Electronic",
    "Jazz",
    "Classical",
    "R&B",
    "Country",
    "Latin",
    "Metal",
    "Folk",
    "Blues",
  ];

  // This code assumes you have React set up and are managing songs in an array called `tracks`.
  // Place the MP3 and image files in your public folder (e.g., /public/songs/)

  const tracks = [
    {
      id: 1,
      title: "Believer",
      artist: "Imagine Dragons",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLldVP7n43b4QaVPjAISJh79Ns6gJhujzh4g",
      src: "/songs/Believer.mp3",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      image:
        "https://th.bing.com/th/id/OIP.o4p9c-z9tx0UBxmsr9WDeAHaEK?w=275&h=180",
      src: "/songs/Blinding Lights.mp3",
    },
    {
      id: 3,
      title: "Soulsweeper",
      artist: "Unknown",
      image: "/songs/soulsweeper.jpg",
      src: "/songs/soulsweeper-252499.mp3",
    },
    {
      id: 4,
      title: "Nightfall",
      artist: "Future Bass",
      image: "/songs/nightfall.jpg",
      src: "/songs/nightfall-future-bass-music-228100.mp3",
    },
    {
      id: 5,
      title: "Tell Me The Truth",
      artist: "Unknown",
      image: "/songs/tellmethetruth.jpg",
      src: "/songs/tell-me-the-truth-260010.mp3",
    },
    {
      id: 6,
      title: "Kugelsicher",
      artist: "TremoxBeatz",
      image: "/songs/kugelsicher.jpg",
      src: "/songs/kugelsicher-by-tremoxbeatz-302838.mp3",
    },
    {
      id: 7,
      title: "Gorila",
      artist: "Royalty Free",
      image: "/songs/gorila.jpg",
      src: "/songs/gorila-315977.mp3",
    },
    {
      id: 8,
      title: "Brain Implant",
      artist: "Cyberpunk Sci-Fi",
      image: "/songs/brainimplant.jpg",
      src: "/songs/brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3",
    },
    {
      id: 9,
      title: "Hit3",
      artist: "SriRam",
      image: "/songs/hit3.jpg",
      src: "/songs/Hit3.mp3",
    },
  ];

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrackClick = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      const colorMap = [
        "bg-pink-900",
        "bg-indigo-900",
        "bg-green-900",
        "bg-yellow-900",
      ];
      setBgColor(colorMap[track.id % colorMap.length]);
    }
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-500 ${bgColor}`}
    >
      <div className="mb-8 mt-12">
        <div className="relative max-w-2xl mx-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-full text-white placeholder-light focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer hover:scale-105 transition bg-gradient-to-br ${
                  index % 2 === 0
                    ? "from-pink-500 to-yellow-500"
                    : "from-purple-500 to-blue-500"
                }`}
              >
                <h3 className="text-lg font-bold text-white">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery && (
        <div className="space-y-8">
          {filteredCategories.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Matched Categories
              </h2>
              <div className="flex flex-wrap gap-4">
                {filteredCategories.map((cat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-500 to-blue-500 p-3 px-6 rounded-full text-white font-medium cursor-pointer hover:scale-105 transition"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Search Results
            </h2>
            {filteredTracks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className="flex items-center space-x-4 bg-secondary/50 p-4 rounded-lg hover:bg-secondary cursor-pointer"
                  >
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{track.title}</h3>
                      <p className="text-light text-sm">
                        {track.artist} • {track.album}
                      </p>
                    </div>
                    {currentTrack?.id === track.id && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track);
                        }}
                      >
                        {isPlaying ? (
                          <PauseIcon className="w-6 h-6" />
                        ) : (
                          <PlayIcon className="w-6 h-6" />
                        )}
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light">
                No tracks found matching “{searchQuery}”.
              </p>
            )}
          </div>
        </div>
      )}

      {currentTrack && (
        <audio ref={audioRef}>
          <source src={currentTrack.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default Search;
