import "../styles/SongList.css"
export default function SongList(props) {
    const playSong = song => {
        props.setCurrentSong(song);
    };

    return (
        <div className="song-list-container">
            <ul>
                {props.songs.length === 0? 
                <li id="no-songs" style={{fontSize: "1.5rem"}}>No songs uploaded</li>:
                props.songs.map(song => (
                    <li style={song.name === props.currentSong?.name ? {color: "#add8e6"}: {}} key={song.name} onClick={() => playSong(song)}>
                        <i className="fa-solid fa-music"></i>{song.name}
                    </li>
                ))} 
            </ul>
        </div>
    )
}