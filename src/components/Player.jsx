import { useState, useRef, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from '@heroicons/react/24/solid';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    src: "/songs/Believer.mp3",
    title: "Believer",
    artist: "Imagine Dragons",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLldVP7n43b4QaVPjAISJh79Ns6gJhujzh4g&s",
  });

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    // Example next song
    setCurrentSong({
      src: "/songs/NewSong.mp3", // Path to the new song
      title: "New Song Title",
      artist: "New Artist",
      cover: "new-song-cover.jpg", // Cover image for the new song
    });
  };

  // Ensure the audio element reloads when the song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio element
      if (isPlaying) {
        audioRef.current.play(); // Ensure it plays if already playing
      }
    }
  }, [currentSong]); // This will trigger whenever the song changes

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-secondary p-4">
      {/* Audio element */}
      <audio ref={audioRef} src={currentSong.src} preload="auto" />

      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center space-x-4">
          <img
            src={currentSong.cover}
            alt="Album Cover"
            className="w-14 h-14 rounded"
          />
          <div>
            <h3 className="text-white font-medium">{currentSong.title}</h3>
            <p className="text-light text-sm">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-6">
            <button
              aria-label="Previous Song"
              className="text-light hover:text-white transition"
            >
              <BackwardIcon className="w-5 h-5" />
            </button>

            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              className="bg-white rounded-full p-2 hover:scale-105 transition"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-black" />
              ) : (
                <PlayIcon className="w-6 h-6 text-black" />
              )}
            </button>

            <button
              aria-label="Next Song"
              className="text-light hover:text-white transition"
              onClick={handleNextSong} // When next button is clicked, change the song
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-96 mt-2">
            <div className="bg-light/30 rounded-full h-1">
              <div className="bg-white w-1/3 h-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Volume Placeholder */}
        <div className="w-40 text-light text-sm text-right">
          Volume
        </div>
      </div>
    </footer>
  );
}

export default Player;
