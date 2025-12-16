"use client";

import { useState, useEffect } from "react";
import styles from "./PageHeroSlider.module.css";

const defaultImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
];

export default function PageHeroSlider({ title, description, images = defaultImages }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={styles.heroContainer}>
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className={styles.overlay}>
                <div className="container">
                    <h1 className={styles.title}>{title}</h1>
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            </div>
        </div>
        
    );
}
