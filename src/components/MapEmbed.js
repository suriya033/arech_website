"use client";

export default function MapEmbed({ googleMapUrl }) {
    if (!googleMapUrl) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#888',
                fontSize: '1.2rem',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem' }}>📍</div>
                <div>
                    <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Map location not set</p>
                    <p style={{ fontSize: '0.9rem', color: '#999' }}>
                        Please add Google Maps embed URL in admin settings
                    </p>
                </div>
            </div>
        );
    }

    return (
        <iframe
            src={googleMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
        />
    );
}
