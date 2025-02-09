import formatTime from "../utils/formatTime";

import PlayerButtons from "./PlayerButtons";

import { useState } from "react";
import "../styles/Player.css";

export default function Player(props) {
    const [audioProgress, setAudioProgress] = useState(0);

    // Always update the audioProgress state to the current value
    const handleTimeUpdate = () => {
        const audio = props.audioRef.current;
        if (audio && audio.duration) {
            setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
    };

    // When progress-bar is changed, update the audio
    const handleProgressChange = (event) => {
        const newProgress = Number(event.target.value);
        setAudioProgress(newProgress);

        if (props.audioRef?.current) {
            props.audioRef.current.currentTime = (newProgress / 100) * props.audioRef.current.duration;
        }
    };

    const playerButtonsType = ["previous", "play", "next"];


    return (
        <>
            <audio ref={props.audioRef} autoPlay onTimeUpdate={handleTimeUpdate} />
            <div className="player-container">
                <img src={`${import.meta.env.BASE_URL}/music-image.png`} alt="musical note image" />
                <div className="progress-container">
                    <label>{
                        props.currentSong?
                        formatTime(Math.floor(props.audioRef.current.currentTime)):
                        null
                    }</label>
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
                    {
                        playerButtonsType.map((type, i) => (
                            <PlayerButtons key={i} type={type} {...props} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}