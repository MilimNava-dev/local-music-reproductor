export function getNextSong(props) {
    const currentIndex = props.songs.findIndex(song => song.name === props.currentSong?.name);
    
        if (currentIndex === -1) return;

        let nextIndex;
        if (props.reproductionType === "loop") {
            nextIndex = (currentIndex + 1) % props.songs.length;
        } else if (props.reproductionType === "random") {
            nextIndex = getNextRandomSong(props, currentIndex);
        }
        props.setPreviousSong(props.currentSong);
        props.setCurrentSong(props.songs[nextIndex]);

}

function getNextRandomSong(props, prevIndex) {
    props.currentSong.reproductionIndex = 1;
    let sortedSongs = props.songs.filter(song => song.reproductionIndex === 0);
    if (sortedSongs.length === 0) {
        props.songs.forEach(song => song.reproductionIndex = 0);
        sortedSongs = [...props.songs].sort((a) => !a.reproductionIndex);
    }
    let nextIndex;
    do {
        const nextIndexNew = Math.floor(Math.random() * sortedSongs.length);
        const nextSong = sortedSongs[nextIndexNew]
        nextIndex = props.songs.findIndex(song => song.name === nextSong.name);
    } while (nextIndex === prevIndex);

    return nextIndex;
}

export function getPreviousSong(props) {
    const currentIndex = props.songs.findIndex(song => song.name === props.currentSong?.name);
    
    if (currentIndex === -1) return;

    let nextIndex;
    if (props.reproductionType === "loop") {
        currentIndex === 0?
        nextIndex = props.songs.length - 1:
        nextIndex = (currentIndex - 1) % props.songs.length;
    } else if (props.reproductionType === "random") {
        if (props.previousSong && props.previousSong !== props.currentSong) {
            nextIndex = props.songs.findIndex(song => song.name === props.previousSong?.name);
            props.setPreviousSong(null);
        } else {
            nextIndex = getNextRandomSong(props, currentIndex);
        }
    }
    props.setCurrentSong(props.songs[nextIndex]);
}