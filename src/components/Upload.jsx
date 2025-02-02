import removeFileExtension from "../utils/removeExtension";
import { useRef } from "react";

export default function Upload(props) {

    const fileInputRef = useRef(null);
    
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        
        if (!files.length) {
            console.error('No files selected');
            return;
        }
    
        const newFiles = files.filter(file => {
            const existingSong = props.songs.some(song => song.name === removeFileExtension(file.name))
            return !existingSong
        });
        
        console.log('newFiles', newFiles);

        if (newFiles.length === 0) {
            console.error('All files are already uploaded');
            return;
        }
    
        const newSongs = newFiles.map(file => ({
            name: removeFileExtension(file.name),
            url: URL.createObjectURL(file),
            file: file
        }));
    
        props.setSongs(prevSongs => [...prevSongs, ...newSongs]);
    };

    return (
        <>
            <button onClick={() => fileInputRef.current.click()}><i className="fa-solid fa-plus"></i></button>
            <input style={{display: 'none'}} ref={fileInputRef} accept='audio/*' type='file' onChange={handleFileUpload} multiple />
        </>
    )
}