"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './ExpertiseSlider.module.css';

export default function ExpertiseSlider({ services }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        if (!isPaused) {
            resetTimeout();
            timeoutRef.current = setTimeout(
                () => setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length),
                6000
            );
        }
        return () => resetTimeout();
    }, [currentIndex, isPaused, services.length]);

    if (!services || services.length === 0) return null;

    return (
        <div
            className={styles.sliderContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className={styles.sliderTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {services.map((service, index) => (
                    <div
                        key={service._id}
                        className={`${styles.slide} ${currentIndex === index ? styles.activeSlide : ''}`}
                    >
                        <div className={styles.card}>
                            <div className={styles.visualSide}>
                                <div className={styles.serviceNum}>
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                                <div className={styles.iconWrapper}>
                                    <span className={styles.icon}>{service.icon || "🛠️"}</span>
                                </div>
                                <div className={styles.decorativeLine}></div>
                            </div>

                            <div className={styles.contentSide}>
                                <div className={styles.categoryBadge}>Professional Service</div>
                                <h3 className={styles.title}>{service.title}</h3>
                                <p className={styles.description}>{service.description}</p>
                                <div className={styles.cardFooter}>
                                    <div className={styles.learnMore}>
                                        <span className={styles.dot}></span>
                                        Explore Details
                                        <span className={styles.arrow}>→</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.navBtn}
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)}
                    aria-label="Previous service"
                >
                    <span className={styles.btnIcon}>←</span>
                    <span className={styles.btnText}>Prev</span>
                </button>

                <div className={styles.pagination}>
                    <span className={styles.currentNum}>{(currentIndex + 1).toString().padStart(2, '0')}</span>
                    <div className={styles.progressTrack}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
                        ></div>
                    </div>
                    <span className={styles.totalNum}>{services.length.toString().padStart(2, '0')}</span>
                </div>

                <button
                    className={styles.navBtn}
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % services.length)}
                    aria-label="Next service"
                >
                    <span className={styles.btnText}>Next</span>
                    <span className={styles.btnIcon}>→</span>
                </button>
            </div>
        </div>
    );
}
