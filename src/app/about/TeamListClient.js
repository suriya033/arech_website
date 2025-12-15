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

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading team...</div>;

    if (members.length === 0) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Team members coming soon.</p>;

    return (
        <div className={styles.grid}>
            {members.map((member) => (
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
    );
}
