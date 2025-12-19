"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './TestimonialsSection.module.css';

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
        <section className={styles.testimonialsSection}>
            <div className="container">
                <div className={styles.titleContainer}>
                    <h2 className="reveal">Client Testimonials</h2>
                    <p className="reveal">What our clients say about our architectural excellence.</p>
                </div>
                <div className={`${styles.grid} stagger-container`}>
                    {testimonials.map(t => (
                        <div key={t._id} className={`${styles.testimonialCard} reveal`}>
                            <p className={styles.quote}>&quot;{t.content}&quot;</p>
                            <div className={styles.author}>
                                {t.image && (
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={60}
                                        height={60}
                                        className={styles.avatar}
                                    />
                                )}
                                <div className={styles.authorInfo}>
                                    <h4>{t.name}</h4>
                                    <p>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

