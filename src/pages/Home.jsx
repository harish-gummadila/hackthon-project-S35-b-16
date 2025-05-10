import { useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = [
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      image:
        "https://th.bing.com/th/id/OIP.o4p9c-z9tx0UBxmsr9WDeAHaEK?w=275&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      src: "/songs/Blinding Lights.mp3",
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      image:
        "https://th.bing.com/th/id/OIP.JvlbuSXvn9L5c79j9PDFKgHaEK?w=321&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      src: "/songs/Levitating.mp3",
    },
    {
      id: 4,
      title: "Shape of You",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.X0TbxH6rDxz5Bn9lAGeg5QHaEK?w=278&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      src: "/songs/Shape_Of_You.mp3",
    },
    {
      id: 5,
      title: "Unstoppable",
      artist: "Sia",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWEgksTiGTWZbAk8aRGBfWvt2Zeb20YPyOg&s",
      src: "/songs/Unstoppable.mp3",
    },
    {
      id: 6,
      title: "Let Me Love You",
      artist: "Justin Bieber",
      image: "https://i.scdn.co/image/ab67616d0000b273bec76efef4e29620043f4068",
      src: "/songs/Let_Me_Love_You.mp3",
    },
    {
      id: 7,
      title: "Believer",
      artist: "Imagine Dragons",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLldVP7n43b4QaVPjAISJh79Ns6gJhujzh4g&s",
      src: "/songs/Believer.mp3",
    },
    {
      id: 8,
      title: "Legends Never Die",
      artist: "Ferras and Katy Perry",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zwYdGxXtbBvIX87w3NXP4HqtA9elWDMUQg&s",
      src: "/songs/Legends_Never_Die.mp3",
    },
    {
      id: 9,
      title: "Perfect",
      artist: "Ed Sheeran",
      image: "https://i.ytimg.com/vi/rHswBadD_Gg/maxresdefault.jpg",
      src: "/songs/Perfect.mp3",
    },
    {
      id: 10,
      title: "Señorita",
      artist: "Shawn Mendes",
      image: "https://i1.sndcdn.com/artworks-000556863069-qjfzn3-t500x500.jpg",
      src: "/songs/Senorta.mp3",
    },
    {
      id: 11,
      title: "Bohemian",
      artist: "unknown",
      image: "https://i.scdn.co/image/ab67616d0000b273bec76efef4e29620043f4068",
      src: "/songs/Bohemian_Rhapsody.mp3",
    },
    {
      id: 12,
      title: "soulsweeper",
      artist: "luther",
      image: "https://i.ytimg.com/vi/rHsWBadD_Gg/hqdefault.jpg",
      src: "/songs/soulsweeper-252499.mp3",
    },

{
  id:13,
  title:"NightFall",
  artist:"Christine",
  image:"https://i.ytimg.com/vi/rHswBadD_Gg/hqdefault.jpg",
  src:"/songs/nightfall-future-bass-music-228100.mp3"
},
{
  id:14,
  title:"Gorila",
  artist:"DJ Wayne",
  image:"https://i.ytimg.com/vi/rHSwBadD_Gg/hqdefault.jpg",
  src:"/songs/gorila-315977"
}


  ];

  const handlePlay = (src) => {
    if (currentSrc === src) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }

      const newAudio = new Audio(src);
      newAudio.play();
      setCurrentAudio(newAudio);
      setCurrentSrc(src);
      setIsPlaying(true);

      newAudio.onended = () => {
        setIsPlaying(false);
        setCurrentSrc(null);
        setCurrentAudio(null);
      };
    }
  };

  return (
    <div className="p-6 md:p-10 bg-blue-50 text-black overflow-y-auto max-h-[calc(100vh-50px)]">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12"
      ></motion.h1>
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {songs.map((song) => (
            <motion.div
              key={song.id}
              whileHover={{ scale: 1.05 }}
              className="bg-transparent p-4 rounded-[40px] shadow hover:shadow-lg transition"
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h4 className="text-base font-bold truncate">{song.title}</h4>
              <p className="text-light text-sm truncate">{song.artist}</p>
              <button
                onClick={() => handlePlay(song.src)}
                className="mt-2 bg-primary text-white text-sm px-3 py-1 rounded-full hover:bg-primary/80 transition"
              >
                {currentSrc === song.src && isPlaying ? "⏸️ Pause" : "▶️ Play"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
