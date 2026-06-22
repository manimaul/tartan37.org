import React, {useState} from 'react';

interface ImageDropzoneProps {
    previewUrl: string | null;
    onFileSelected: (file: File) => void;
}

function ImageDropzone({previewUrl, onFileSelected}: ImageDropzoneProps) {
    const [dragOver, setDragOver] = useState(false);
    const inputId = 'fleetImageInput';

    function handleFiles(files: FileList | null) {
        if (files && files[0]) {
            onFileSelected(files[0]);
        }
    }

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
            }}
            onClick={() => document.getElementById(inputId)?.click()}
            style={{
                border: dragOver ? '2px dashed #0d6efd' : '2px dashed #ccc',
                borderRadius: '6px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragOver ? '#f0f7ff' : '#fafafa',
            }}
        >
            <input
                id={inputId}
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={(e) => handleFiles(e.target.files)}
            />
            {previewUrl ? (
                <img src={previewUrl} alt="preview" style={{maxWidth: '100%', maxHeight: '200px'}} />
            ) : (
                <p className="mb-0">Drag &amp; drop an image here, or click to choose a file</p>
            )}
        </div>
    );
}

export default ImageDropzone;
