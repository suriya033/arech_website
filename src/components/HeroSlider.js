"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import styles from "./HeroSlider.module.css";

const heroImage = "/hero-bg.png";

export default function HeroSlider() {
    return (
        <div className={styles.heroBackground}>
            <div
                className={`${styles.imageSlide} ${styles.active}`}
                style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className={styles.overlay} />
        </div>
    );
}
