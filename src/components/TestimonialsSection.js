"use client";
import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => setTestimonials(data))
            .catch(err => console.error(err));
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <section className="section container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>Client Testimonials</h2>
                <p>What our clients say about us.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {testimonials.map(t => (
                    <div key={t._id} style={{ padding: '2rem', backgroundColor: 'var(--secondary)', borderRadius: '8px' }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>"{t.content}"</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {t.image && <img src={t.image} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />}
                            <div>
                                <h4 style={{ marginBottom: '0.25rem', fontSize: '1rem' }}>{t.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
