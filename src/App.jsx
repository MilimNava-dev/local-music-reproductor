import "./styles/App.css"
import './styles/Warning.css'
import { useState, useRef } from "react"

// Import components
import MusicPlayer from "./components/MusicPlayer"
import OptionButtons from "./components/OptionButtons"
import SongList from "./components/SongList"
import Warning from "./components/Warning"

export default function App() {
  // Set states
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reproductionType, setReproductionType] = useState("loop");
  const [previousSong, setPreviousSong] = useState(null);
  const [warnings, setWarnings] = useState([]);

  // Diferent warnings to try with
    // {message: 'All files are already uploaded', type: 'red'}
    // {message: 'Some files are already uploaded', type: 'orange'}
    // {message: 'No files selected', type: 'red'}

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
    setPreviousSong,
    warnings,
    setWarnings
  };
  
  console.log('running app with states:', songs, currentSong, isPlaying, warnings);
  return (
    <>
      <video src={`${import.meta.env.BASE_URL}/clouds.mp4`} autoPlay loop muted />
      <div className="main-container">
        <main>
          <MusicPlayer {...playerProps}/>
          <OptionButtons {...playerProps}/>
        </main>
        <SongList {...playerProps}/>
        <div className="warning-container">
          {warnings.map((warning, index) => <Warning key={index} warning={warning} {...playerProps} />)}
        </div>
      </div>
    </>
  )
}