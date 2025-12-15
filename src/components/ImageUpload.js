"use client";

import { useState, useEffect } from "react";

export default function ImageUpload({ value, onChange, label = "Image" }) {
    const [uploadMethod, setUploadMethod] = useState("url"); // 'url' or 'file'
    const [preview, setPreview] = useState(value || "");

    useEffect(() => {
        setPreview(value || "");
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPreview(base64String);
                onChange(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setPreview(url);
        onChange(url);
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                {label}
            </label>

            <div style={{ marginBottom: '1rem' }}>
                <button
                    type="button"
                    onClick={() => setUploadMethod("url")}
                    style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: uploadMethod === "url" ? 'var(--primary)' : 'transparent',
                        color: uploadMethod === "url" ? 'white' : 'var(--primary)',
                        border: '1px solid var(--primary)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => setUploadMethod("file")}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: uploadMethod === "file" ? 'var(--primary)' : 'transparent',
                        color: uploadMethod === "file" ? 'white' : 'var(--primary)',
                        border: '1px solid var(--primary)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Upload File
                </button>
            </div>

            {uploadMethod === "url" ? (
                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={value || ""}
                    onChange={handleUrlChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                />
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                />
            )}

            {preview && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Preview:</p>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                        }}
                    />
                </div>
            )}
        </div>
    );
}
