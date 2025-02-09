import "./styles/App.css"
import { useState, useRef } from "react"

// Import components
import MusicPlayer from "./components/MusicPlayer"
import OptionButtons from "./components/OptionButtons"
import SongList from "./components/SongList"

export default function App() {
  // Set states
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reproductionType, setReproductionType] = useState("loop");
  const [previousSong, setPreviousSong] = useState(null);

  // Set audioRef
  const audioRef = useRef(null)

  // Props for components
  const playerProps = {
    reproductionType,
    setReproductionType,
    isPlaying,
    setIsPlaying,
    audioRef,
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    previousSong,
    setPreviousSong
  };
  
  console.log('running app with states:', songs, currentSong, isPlaying);
  return (
    <>
      <video src={`${import.meta.env.BASE_URL}/clouds.mp4`} autoPlay loop muted />
      <div className="main-container">
        <main>
          <MusicPlayer {...playerProps}/>
          <OptionButtons {...playerProps}/>
        </main>
        <SongList {...playerProps}/>
      </div>
    </>
  )
}