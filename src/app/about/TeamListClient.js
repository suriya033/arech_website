"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./TeamList.module.css";

export default function TeamListClient() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={styles.teamSection}>
            <div className={styles.teamGrid}>
                {members.map((member) => (
                    <div
                        key={member._id}
                        className={styles.memberCard}
                    >
                        <Link href={`/about/team/${member._id}`} className={styles.cardLink}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={styles.memberImage}
                                />
                                <div className={styles.imageOverlay}>
                                    <span className={styles.viewProfile}>View Profile</span>
                                </div>
                            </div>

                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                               
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
