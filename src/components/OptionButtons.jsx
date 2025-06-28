import '../styles/OptionButtons.css'
import Upload from "./Upload";
import {getNextSong} from "../utils/getNPSong";
import { useEffect } from "react";

export default function OptionButtons(props) {

    useEffect(() => {
        if (!props.audioRef?.current) return;

        const audioElement = props.audioRef.current;

        // Set next song when song finishes
        const handleSongEnd = () => {
            // If the audio is in repeat-one mode, restart the song
            if (props.reproductionType === "repeat-one") {
                audioElement.currentTime = 0;
                audioElement.play();
                return;
            };

            // If not, get the next song
            getNextSong(props);
        };
        
        audioElement.addEventListener("ended", handleSongEnd);

        return () => {
            audioElement.removeEventListener("ended", handleSongEnd);
        };
    }, [props.currentSong, props.songs, props.reproductionType]);

    // Every time currentSong changes, we play it
    useEffect(() => {
        if (!props.audioRef.current || !props.currentSong?.url) return;
    
        const audioElement = props.audioRef.current;
    
        // Stops the audio
        audioElement.pause();
        
        // Assign new source
        audioElement.src = props.currentSong.url;
        
        // Waits for the audio to load before playing it
        const playAudio = () => {
            audioElement.play()
                .then(() => props.setIsPlaying(true))
                .catch(error => console.error("Error al reproducir la canción:", error));
        };
    
        audioElement.addEventListener("loadeddata", playAudio, { once: true });
    
        return () => {
            // Remove event listener
            audioElement.removeEventListener("loadeddata", playAudio);
        };
    
    }, [props.currentSong]);
    
    // Changes the reproductionType state when the user clicks
    const handleChangeReproductionType = () => {
        props.setReproductionType(prev => {
            if (prev === "loop") return "random";
            if (prev === "random") return "repeat-one";
            return "loop";
        });
    };

    // Selects the correct icon for the reproduction type
    const renderIcon = () => {
        if (props.reproductionType === "loop") {
            return <i className="fa-solid fa-repeat"></i>;
        } else if (props.reproductionType === "random") {
            return <i className="fa-solid fa-shuffle"></i>;
        } else {
            return <img src={`${import.meta.env.BASE_URL}/repeat-one.svg`} alt="Repeat One" className="custom-icon" />;
        }
    };

    return (
        <section id="buttons-container">
            <button onClick={handleChangeReproductionType}>{renderIcon()}</button>
            <Upload {...props}/>
        </section>
    );
}