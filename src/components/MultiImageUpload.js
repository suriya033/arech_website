"use client";

import { useState } from "react";

export default function MultiImageUpload({ values = [], onChange, label = "Images" }) {
    const [uploadMethod, setUploadMethod] = useState("url");
    const [currentInput, setCurrentInput] = useState("");

    const handleAddImage = (url) => {
        if (url) {
            onChange([...values, url]);
            setCurrentInput("");
        }
    };

    const handleRemoveImage = (index) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onChange(newValues);
    };

    const handleMoveImage = (index, direction) => {
        const newValues = [...values];
        if (direction === 'left' && index > 0) {
            [newValues[index - 1], newValues[index]] = [newValues[index], newValues[index - 1]];
        } else if (direction === 'right' && index < newValues.length - 1) {
            [newValues[index + 1], newValues[index]] = [newValues[index], newValues[index + 1]];
        }
        onChange(newValues);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleAddImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
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
                    Add URL
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
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                        type="url"
                        placeholder="Enter image URL"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => handleAddImage(currentInput)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Add
                    </button>
                </div>
            ) : (
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            )}

            {values.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {values.map((img, index) => {
                        if (!img || typeof img !== 'string') return null;
                        return (
                            <div key={index} style={{ position: 'relative', height: '100px' }}>
                                {img.startsWith('data:application/pdf') || img.endsWith('.pdf') ? (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        background: '#f5f5f5',
                                        fontSize: '2rem'
                                    }}>
                                        📄
                                    </div>
                                ) : (
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)'
                                        }}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        zIndex: 10
                                    }}
                                    title="Remove"
                                >
                                    ×
                                </button>

                                {/* Move Controls */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '5px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    gap: '8px',
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    padding: '4px 8px',
                                    borderRadius: '20px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    zIndex: 5
                                }}>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleMoveImage(index, 'left'); }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#333',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                padding: '0',
                                                lineHeight: 1,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                            title="Move Left"
                                        >
                                            ◀
                                        </button>
                                    )}
                                    {index < values.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleMoveImage(index, 'right'); }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#333',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                padding: '0',
                                                lineHeight: 1,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                            title="Move Right"
                                        >
                                            ▶
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
