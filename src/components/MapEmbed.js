"use client";

import { useState } from "react";

export default function MapEmbed({ googleMapUrl }) {
    const [mapError, setMapError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (!googleMapUrl || googleMapUrl.trim() === '') {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    animation: 'pulse 4s ease-in-out infinite'
                }}></div>

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                    padding: '3rem',
                    maxWidth: '500px'
                }}>
                    <div style={{
                        fontSize: '5rem',
                        marginBottom: '1.5rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}>
                        📍
                    </div>
                    <h3 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        fontWeight: '700',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        Map Location Not Set
                    </h3>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                        opacity: 0.95
                    }}>
                        To display your office location on the map, please configure the Google Maps embed URL in your admin settings.
                    </p>
                    <div style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.95rem'
                    }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                            📝 Quick Setup:
                        </strong>
                        Admin → Settings → Google Map Embed URL
                    </div>
                </div>

                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
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
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '3rem',
                color: 'white'
            }}>
                <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>⚠️</div>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        Unable to Load Map
                    </h3>
                    <p style={{ fontSize: '1rem', lineHeight: '1.6', opacity: 0.95 }}>
                        The map URL appears to be invalid. Please verify the Google Maps embed URL in your admin settings.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Loading Overlay */}
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    color: 'white'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            border: '4px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        }}></div>
                        <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Loading Map...</p>
                    </div>
                    <style jsx>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

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
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setMapError(true);
                    setIsLoading(false);
                }}
            />

            {/* Location Badge */}
            {!isLoading && (
                <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: '#2d3748',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    pointerEvents: 'none',
                    zIndex: 5,
                    animation: 'slideUp 0.5s ease-out'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                    <span>Find Us Here</span>
                    <style jsx>{`
                        @keyframes slideUp {
                            from {
                                opacity: 0;
                                transform: translateX(-50%) translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(-50%) translateY(0);
                            }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}
