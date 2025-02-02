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
        if (props.audioRef.current && props.currentSong) {
            props.audioRef.current.src = props.currentSong.url;
            props.audioRef.current.play().catch(error => {
                console.error("Error al reproducir la canción:", error);
            });
            props.setIsPlaying(true)
        }
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