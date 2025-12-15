"use client";

import { useState, useEffect } from "react";
import styles from "./HeroSlider.module.css";

const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
];

export default function HeroSlider() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Changed to 5000ms (5s) for better UX, 0.5s is too fast.

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.heroBackground}>
            {heroImages.map((img, index) => (
                <div
                    key={index}
                    className={`${styles.imageSlide} ${index === currentImage ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className={styles.overlay} />
        </div>
    );
}
