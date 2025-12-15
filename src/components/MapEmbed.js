"use client";

import { useState } from "react";

export default function MapEmbed({ googleMapUrl }) {
    const [mapError, setMapError] = useState(false);

    if (!googleMapUrl || googleMapUrl.trim() === '') {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '3rem',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '4rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    📍
                </div>
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '0.75rem',
                        fontWeight: '700',
                        color: '#2d3748'
                    }}>
                        Map Location Not Configured
                    </h3>
                    <p style={{
                        fontSize: '1rem',
                        color: '#718096',
                        maxWidth: '400px',
                        lineHeight: '1.6'
                    }}>
                        To display the map, please add your Google Maps embed URL in the admin settings panel.
                    </p>
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        color: '#4a5568'
                    }}>
                        <strong>How to add:</strong> Admin → Settings → Google Map Embed URL
                    </div>
                </div>
            </div>
        );
    }

    if (mapError) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2rem'
            }}>
                <div style={{ fontSize: '3rem' }}>⚠️</div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#2d3748' }}>
                        Unable to Load Map
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        Please check if the map URL is correct in admin settings.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <iframe
                src={googleMapUrl}
                width="100%"
                height="100%"
                style={{
                    border: 0,
                    display: 'block'
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
                onError={() => setMapError(true)}
            />
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#4a5568',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                pointerEvents: 'none'
            }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                Find Us Here
            </div>
        </div>
    );
}
