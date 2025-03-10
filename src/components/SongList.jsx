import "../styles/SongList.css"
export default function SongList(props) {
    const playSong = song => {
        props.setCurrentSong(song);
    };

    const deleteSong = song => {
        props.setSongs(prevSongs => prevSongs.filter(prevSong => prevSong.name !== song.name));
        if (props.currentSong?.name === song.name) {
            props.setCurrentSong(null)
            props.setIsPlaying(false)
            props.audioRef.current.pause();
        };
    }

    return (
        <div className="song-list-container">
            <ul>
                {props.songs.length === 0? 
                <li id="no-songs" style={{fontSize: "1.5rem"}}>No songs uploaded</li>:
                props.songs.map(song => (
                    <div className="song-item" key={song.name} style={song.name === props.currentSong?.name ? {color: "#add8e6"}: {}}>
                        <li onClick={() => playSong(song)}>
                            <i className="fa-solid fa-music"></i>{song.name}
                        </li>
                        <i className="fa-solid fa-trash delete-icon" onClick={() => deleteSong(song)}></i>
                    </div>
                ))} 
            </ul>
        </div>
    )
}