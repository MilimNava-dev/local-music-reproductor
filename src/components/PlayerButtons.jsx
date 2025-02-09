import { getNextSong, getPreviousSong } from "../utils/getNPSong";
export default function PlayerButtons(props) {
    const handleStop = () => {
        const audioElement = props.audioRef.current;

    
        if (!props.currentSong) {
            if (props.songs.length === 0) return;

            // If there are songs, play the first one
            props.setCurrentSong(props.songs[0]);
            return;
        }
    
        if (!audioElement.paused) {
            // If the audio is playing, pause it
            audioElement.pause();
            props.setIsPlaying(false);
        } else {
            // If the audio is paused, play it
            audioElement.play()
                .then(() => props.setIsPlaying(true))
                .catch(error => console.error("Error al reproducir la canción:", error));
        }
    };

    let buttonFunction;
    let buttonIcon;
    let buttonDisabled;
    if (props.type === "play") {
        buttonFunction = () => handleStop();
        buttonIcon = props.isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>
        buttonDisabled = !props.songs.length ? true : false;
    } else if (props.type === "next") {
        buttonFunction = () => getNextSong(props);
        buttonIcon = <i className="fa-solid fa-forward-step"></i>;
        buttonDisabled = !props.currentSong ? true : false;
    } else if (props.type === "previous") {
        buttonFunction = () => getPreviousSong(props);
        buttonIcon = <i className="fa-solid fa-backward-step"></i>;
        buttonDisabled = !props.currentSong ? true : false;
    }



    return (
        <button 
            className="player-controls" 
            onClick={buttonFunction}
            disabled={buttonDisabled}
        >
            {buttonIcon}
        </button>
    )
}
