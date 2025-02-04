import { getNextSong, getPreviousSong } from "../utils/getNPSong";
import { useState } from "react";
import "../styles/Player.css";

export default function Player(props) {
    const [audioProgress, setAudioProgress] = useState(0);

    const handleTimeUpdate = () => {
        const audio = props.audioRef.current;
        if (audio && audio.duration) {
            setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
    };

    const handleProgressChange = (event) => {
        const newProgress = Number(event.target.value);
        setAudioProgress(newProgress);

        if (props.audioRef?.current) {
            props.audioRef.current.currentTime = (newProgress / 100) * props.audioRef.current.duration;
        }
    };

    const handleStop = () => {
        if (!props.currentSong) {
            if (props.songs.length === 0) return;
            props.setCurrentSong(props.songs[0]);
            return; // Evita ejecutar play/pause si estamos cambiando la canción
        }
    
        const audioElement = props.audioRef.current;
        
        if (!audioElement) return;
    
        if (!audioElement.paused) {
            // Si el audio se está reproduciendo, lo pausamos
            audioElement.pause();
            props.setIsPlaying(false);
        } else {
            // Si el audio está pausado, intentamos reproducirlo
            audioElement.play()
                .then(() => props.setIsPlaying(true))
                .catch(error => console.error("Error al reproducir la canción:", error));
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <audio ref={props.audioRef} autoPlay onTimeUpdate={handleTimeUpdate} />
            <div className="player-container">
                <img src={`${import.meta.env.BASE_URL}/music-image.png`} alt="musical note image" />
                <div className="progress-container">
                    <label>{props.audioRef.current?.currentTime? formatTime(Math.floor(props.audioRef.current.currentTime)): null}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={audioProgress} 
                        onChange={handleProgressChange} 
                        disabled={!props.currentSong}
                    />
                    <label>{props.audioRef.current?.duration ? formatTime(Math.floor(props.audioRef.current.duration)): null}</label>
                </div>
                <div className="player-controls-container">
                    <button className="player-controls" onClick={() => getPreviousSong(props)}>
                        <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button className="player-controls" onClick={handleStop}>
                        {props.isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                    </button>
                    <button className="player-controls" onClick={() => getNextSong(props)}>
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                </div>
            </div>
        </>
    );
}