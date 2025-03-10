import removeFileExtension from "../utils/removeExtension";
import { useRef } from "react";

export default function Upload(props) {

    // Set Ref for file input
    const fileInputRef = useRef(null);
    
    const handleFileUpload = (event) => {
        // Get an array of files from the input
        const files = Array.from(event.target.files);
        
        if (!files.length) {
            console.warn('No files selected');
            return;
        }
        
        // Filter out existing songs
        const newFiles = files.filter(file => {
            const existingSong = props.songs.some(song => song.name === removeFileExtension(file.name))
            return !existingSong
        });
        
        if (newFiles.length === 0) {
            console.error('All files are already uploaded');
            return;
        }

        console.log('New Files: ', newFiles);
    
        // Create an array of new song objects in correct format
        const newSongs = newFiles.map(file => ({
            name: removeFileExtension(file.name),
            url: URL.createObjectURL(file),
            reproductionIndex: 0,
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