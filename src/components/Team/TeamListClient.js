"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./TeamList.module.css";

export default function TeamListClient() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);

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

    const handleViewMember = (member) => {
        setSelectedMember(member);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedMember(null);
        document.body.style.overflow = 'unset';
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
                        <div className={styles.cardContent}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={member.image || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop"}
                                    alt={member.name}
                                    fill
                                    className={styles.memberImage}
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.imageOverlay}>
                                    <button
                                        className={styles.viewProfileBtn}
                                        onClick={() => handleViewMember(member)}
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>

                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Member Detail Modal */}
            {selectedMember && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeModal}>×</button>

                        <div className={styles.modalGrid}>
                            <div className={styles.modalImageContainer}>
                                <Image
                                    src={selectedMember.image || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop"}
                                    alt={selectedMember.name}
                                    fill
                                    className={styles.modalImage}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            <div className={styles.modalInfo}>
                                <span className={styles.modalRole}>{selectedMember.role}</span>
                                <h2 className={styles.modalName}>{selectedMember.name}</h2>

                                <div className={styles.modalDivider}></div>

                                <div className={styles.modalBio}>
                                    <h3>About</h3>
                                    {selectedMember.description ? (
                                        selectedMember.description.split('\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))
                                    ) : (
                                        <p>No biography available.</p>
                                    )}
                                </div>

                                {selectedMember.expertise && (
                                    <div className={styles.modalExpertise}>
                                        <h3>Expertise</h3>
                                        <div className={styles.expertiseTags}>
                                            {Array.isArray(selectedMember.expertise)
                                                ? selectedMember.expertise.map((skill, i) => (
                                                    <span key={i} className={styles.tag}>{skill}</span>
                                                ))
                                                : selectedMember.expertise.split(',').map((skill, i) => (
                                                    <span key={i} className={styles.tag}>{skill.trim()}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}

                                <div className={styles.modalContact}>
                                    {selectedMember.email && (
                                        <a href={`mailto:${selectedMember.email}`} className={styles.contactLink}>
                                            ✉ {selectedMember.email}
                                        </a>
                                    )}
                                    {selectedMember.phone && (
                                        <a href={`tel:${selectedMember.phone}`} className={styles.contactLink}>
                                            📞 {selectedMember.phone}
                                        </a>
                                    )}
                                    {selectedMember.linkedin && (
                                        <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                            in LinkedIn Profile
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
