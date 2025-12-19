"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./StatsSection.module.css";

const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count}</span>;
};

export default function StatsSection() {
    const [stats, setStats] = useState({
        ongoingProjects: 0,
        completedProjects: 0,
        publications: 0
    });

    useEffect(() => {
        fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setStats({
                    ongoingProjects: data.ongoingProjects || 0,
                    completedProjects: data.completedProjects || 0,
                    publications: data.publications || 0
                });
            })
            .catch(err => console.error("Failed to fetch stats:", err));
    }, []);

    return (
        <section className={styles.statsSection}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={`${styles.statCard} reveal`}>
                        <div className={styles.number}>
                            <Counter end={stats.ongoingProjects} />+
                        </div>
                        <div className={styles.label}>Ongoing Projects</div>
                    </div>
                    <div className={`${styles.statCard} reveal`}>
                        <div className={styles.number}>
                            <Counter end={stats.completedProjects} />+
                        </div>
                        <div className={styles.label}>Completed Projects</div>
                    </div>
                    <div className={`${styles.statCard} reveal`}>
                        <div className={styles.number}>
                            <Counter end={stats.publications} />+
                        </div>
                        <div className={styles.label}>Publications</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
