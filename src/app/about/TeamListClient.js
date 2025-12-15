"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./TeamList.module.css";

export default function TeamListClient() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/team");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            if (data.length === 0) throw new Error("No data");
            setMembers(data);
        } catch (error) {
            console.log("Error fetching team:", error.message);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading team...</div>;

    if (members.length === 0) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Team members coming soon.</p>;

    // Group members into pages of 3 (3 rows × 1 column per page)
    const membersPerPage = 3;
    const totalPages = Math.ceil(members.length / membersPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    };

    const startIndex = currentPage * membersPerPage;
    const currentMembers = members.slice(startIndex, startIndex + membersPerPage);

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slider} ref={sliderRef}>
                <div className={styles.sliderTrack}>
                    {currentMembers.map((member) => (
                        <div key={member._id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.role}</p>
                                {member.description && (
                                    <p className={styles.description}>
                                        {member.description}
                                    </p>
                                )}
                                <Link href={`/about/team/${member._id}`} className={`btn-outline ${styles.button}`}>
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <div className={styles.controls}>
                    <button onClick={handlePrevious} className={styles.navButton} aria-label="Previous">
                        ←
                    </button>
                    <div className={styles.dots}>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`${styles.dot} ${index === currentPage ? styles.activeDot : ''}`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button onClick={handleNext} className={styles.navButton} aria-label="Next">
                        →
                    </button>
                </div>
            )}
        </div>
    );
}
