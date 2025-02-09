import Player from "./Player";

export default function MusicPlayer(props) {
    return (
        <>
            <h2>{props.currentSong?.name || 'No song selected'}</h2>
            <Player {...props}/>
        </>
    )
}