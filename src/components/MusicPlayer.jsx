import Player from "./Player";

export default function MusicPlayer(props) {
    return (
        <>
            <h2>{props.currentSong?.name || 'No song selected'}</h2>
            <Player reproductionType={props.reproductionType} setIsPlaying={props.setIsPlaying} isPlaying={props.isPlaying} audioRef={props.audioRef} songs={props.songs} setSongs={props.setSongs} setCurrentSong={props.setCurrentSong} currentSong={props.currentSong}/>
        </>
    )
}