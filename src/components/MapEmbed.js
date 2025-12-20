"use client";

import { useState, useEffect } from "react";

export default function MapEmbed({ googleMapUrl }) {
    const [mapError, setMapError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Default to the office address if no URL is provided
    const defaultMapUrl = "https://maps.google.com/maps?q=1/427,+KCG+College+Road,+Karapakkam,+Chennai+-+600097&t=&z=15&ie=UTF8&iwloc=&output=embed";

    const finalUrl = googleMapUrl && googleMapUrl.trim() !== '' ? googleMapUrl : defaultMapUrl;

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
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#f8fafc',
            overflow: 'hidden',
            borderRadius: 'inherit'
        }}>
            {/* Loading Overlay */}
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            border: '3px solid rgba(197, 160, 89, 0.1)',
                            borderTopColor: '#c5a059',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1.5rem'
                        }}></div>
                        <p style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>Initializing Map...</p>
                    </div>
                </div>
            )}

            <iframe
                src={finalUrl}
                width="100%"
                height="100%"
                style={{
                    border: 0,
                    display: 'block',
                    filter: isLoading ? 'grayscale(1) opacity(0.5)' : 'none',
                    transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
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

            {/* Premium Controls Overlay */}
            {!isLoading && (
                <>
                    <div style={{
                        position: 'absolute',
                        top: '30px',
                        left: '30px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.25rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        zIndex: 5,
                        animation: 'slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#c5a059',
                            fontWeight: '800',
                            marginBottom: '0.5rem'
                        }}>Our Location</h4>
                        <p style={{
                            margin: 0,
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#0f172a'
                        }}>Karapakkam, Chennai</p>
                    </div>

                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=1/427,KCG+College+Road,Karapakkam,Chennai-600097`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '30px',
                            background: '#0f172a',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                            zIndex: 5,
                            animation: 'slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.background = '#c5a059';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = '#0f172a';
                        }}
                    >
                        <span>Get Directions</span>
                        <span style={{ fontSize: '1.2rem' }}>↗</span>
                    </a>
                </>
            )}

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
