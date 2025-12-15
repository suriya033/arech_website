"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./TeamList.module.css";

export default function TeamListClient() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

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

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading our amazing team...</p>
            </div>
        );
    }

    if (members.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>👥</div>
                <h3>No Team Members Yet</h3>
                <p>Our team information will be available soon.</p>
            </div>
        );
    }

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
        <div className={styles.teamSection}>
            <div className={styles.teamGrid}>
                {currentMembers.map((member, index) => (
                    <div
                        key={member._id}
                        className={styles.memberCard}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className={styles.cardInner}>
                            <div className={styles.imageWrapper}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className={styles.memberImage}
                                    />
                                    <div className={styles.imageOverlay}>
                                        <Link href={`/about/team/${member._id}`} className={styles.viewProfileBtn}>
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.memberInfo}>
                                <div className={styles.memberHeader}>
                                    <h3 className={styles.memberName}>{member.name}</h3>
                                    <span className={styles.memberRole}>{member.role}</span>
                                </div>

                                {member.description && (
                                    <p className={styles.memberDescription}>
                                        {member.description}
                                    </p>
                                )}

                                <div className={styles.cardActions}>
                                    <Link href={`/about/team/${member._id}`} className={styles.learnMoreBtn}>
                                        Learn More →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.navigation}>
                    <button
                        onClick={handlePrevious}
                        className={styles.navBtn}
                        aria-label="Previous page"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className={styles.pageIndicators}>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`${styles.pageIndicator} ${index === currentPage ? styles.activeIndicator : ''}`}
                                aria-label={`Go to page ${index + 1}`}
                            >
                                <span className={styles.indicatorNumber}>{index + 1}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className={styles.navBtn}
                        aria-label="Next page"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            )}

            <div className={styles.teamStats}>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{members.length}</span>
                    <span className={styles.statLabel}>Team Members</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{currentPage + 1}/{totalPages}</span>
                    <span className={styles.statLabel}>Page</span>
                </div>
            </div>
        </div>
    );
}
