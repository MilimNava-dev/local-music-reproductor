import "./styles/App.css"
import { useState, useRef, useEffect } from "react"

import MusicPlayer from "./components/MusicPlayer"
import OptionButtons from "./components/OptionButtons"
import SongList from "./components/SongList"

export default function App() {
  const [songs, setSongs] = useState([])

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reproductionType, setReproductionType] = useState("loop");

  const audioRef = useRef(null)
  
  console.log('running app with states:', songs, currentSong, isPlaying);
  return (
    <>
      <video src="/clouds.mp4" autoPlay loop muted />
      <div className="main-container">
        <main>
          <MusicPlayer reproductionType={reproductionType} setIsPlaying={setIsPlaying} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong}/>
          <OptionButtons setReproductionType={setReproductionType} reproductionType={reproductionType} setIsPlaying={setIsPlaying} isPlaying={isPlaying} audioRef={audioRef}  songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong}/>
        </main>
        <SongList setReproductionType={setReproductionType} reproductionType={reproductionType} setIsPlaying={setIsPlaying} isPlaying={isPlaying} audioRef={audioRef}  songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong}/>
      </div>
    </>
  )
}