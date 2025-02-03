import '../styles/OptionButtons.css'
import Upload from "./Upload";
import {getNextSong} from "../utils/getNPSong";
import { useState, useEffect } from "react";

export default function OptionButtons(props) {

    useEffect(() => {
        if (!props.audioRef?.current) return;

        const audioElement = props.audioRef.current;

        const handleSongEnd = () => {
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
        props.setReproductionType((prevReproductionType) => prevReproductionType === "loop" ? "random" : "loop");
    };



    return (
        <section id="buttons-container">
            <button onClick={handleChangeReproductionType}>{props.reproductionType === "loop"? <i className="fa-solid fa-repeat"></i> : <i className="fa-solid fa-shuffle"></i>}</button>
            <Upload audioRef={props.audioRef} songs={props.songs} setSongs={props.setSongs} setCurrentSong={props.setCurrentSong} currentSong={props.currentSong}/>
        </section>
    );
}