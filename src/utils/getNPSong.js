export function getNextSong(props) {
    const currentIndex = props.songs.findIndex(song => song.name === props.currentSong?.name);
    
        if (currentIndex === -1) return;

        let nextIndex;
        if (props.reproductionType === "loop") {
            nextIndex = (currentIndex + 1) % props.songs.length;
        } else if (props.reproductionType === "random") {
            do {
                nextIndex = Math.floor(Math.random() * props.songs.length);
            } while (nextIndex === currentIndex); // Evita que la misma canción se repita
        }

        props.setCurrentSong(props.songs[nextIndex]);

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
            do {
                nextIndex = Math.floor(Math.random() * props.songs.length);
            } while (nextIndex === currentIndex); // Evita que la misma canción se repita
        }

        props.setCurrentSong(props.songs[nextIndex]);
}