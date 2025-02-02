export default function removeFileExtension (filename) {
    return filename.replace(/\.[^/.]+$/, ""); 
};