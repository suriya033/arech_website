"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Failed to fetch: ${res.status}`);
            }
            const data = await res.json();

            if (!Array.isArray(data)) {
                console.error("Received non-array data:", data);
                throw new Error("Invalid data format received from server");
            }

            if (data.length === 0) {
                setMembers([]);
            } else {
                setMembers(data);
            }
        } catch (error) {
            console.error("Error fetching team:", error.message);
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
            <div className={`${styles.teamGrid} stagger-container`}>
                {members.map((member, index) => (
                    <div
                        key={member._id || index}
                        className={`${styles.memberCard} reveal`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className={styles.cardLink}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={member.image || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop"}
                                    alt={member.name}
                                    fill
                                    className={styles.memberImage}
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
