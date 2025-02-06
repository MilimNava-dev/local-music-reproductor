import '../styles/OptionButtons.css'
import Upload from "./Upload";
import {getNextSong} from "../utils/getNPSong";
import { useEffect } from "react";

export default function OptionButtons(props) {

    useEffect(() => {
        if (!props.audioRef?.current) return;

        const audioElement = props.audioRef.current;

        const handleSongEnd = () => {
            if (props.reproductionType === "repeat-one") {
                audioElement.currentTime = 0;
                audioElement.play();
                return;
            };
            getNextSong(props);
        };

        audioElement.addEventListener("ended", handleSongEnd);

        return () => {
            audioElement.removeEventListener("ended", handleSongEnd);
        };
    }, [props.currentSong, props.songs, props.reproductionType]);

    
    useEffect(() => {
        if (!props.audioRef.current || !props.currentSong?.url) return;  // Verifica que currentSong y su URL existan
    
        const audioElement = props.audioRef.current;
    
        // Detiene cualquier reproducción en curso antes de cambiar la fuente
        audioElement.pause();
        
        // Asigna la nueva fuente
        audioElement.src = props.currentSong.url;
        
        // Espera a que los datos del audio se carguen antes de intentar reproducir
        const playAudio = () => {
            audioElement.play()
                .then(() => props.setIsPlaying(true))
                .catch(error => console.error("Error al reproducir la canción:", error));
        };
    
        audioElement.addEventListener("loadeddata", playAudio, { once: true });
    
        return () => {
            audioElement.removeEventListener("loadeddata", playAudio);
        };
    
    }, [props.currentSong]);
    
    const handleChangeReproductionType = () => {
        props.setReproductionType(prev => {
            if (prev === "loop") return "random";
            if (prev === "random") return "repeat-one";
            return "loop";
        });
    };

    // Selección del icono según el modo de reproducción
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
            <Upload audioRef={props.audioRef} songs={props.songs} setSongs={props.setSongs} setCurrentSong={props.setCurrentSong} currentSong={props.currentSong}/>
        </section>
    );
}