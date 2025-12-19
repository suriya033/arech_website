"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "../admin.module.css";

export default function MessagesManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleReadStatus = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/contact?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: !currentStatus }),
            });
            if (res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, read: !currentStatus } : m));
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading Messages...</p>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className={styles.container}>
            <AdminSidebar />

            <main className={styles.main}>
                <div className={styles.header}>
                    <div>
                        <h1>Contact Messages</h1>
                        <p>Manage and respond to client inquiries.</p>
                    </div>
                </div>

                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Total Messages</span>
                        <span className={styles.statValue}>{messages.length}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Unread</span>
                        <span className={styles.statValue}>{messages.filter(m => !m.read).length}</span>
                    </div>
                </div>

                {messages.length === 0 ? (
                    <div className={styles.formCard} style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📬</div>
                        <h3>No messages yet</h3>
                        <p style={{ color: 'var(--text-muted)' }}>When clients contact you, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className={styles.projectGrid}>
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={styles.projectCard}
                                style={{
                                    opacity: 1,
                                    borderLeft: msg.read ? 'none' : '4px solid var(--accent)',
                                    backgroundColor: msg.read ? 'white' : '#fffcf5'
                                }}
                            >
                                <div className={styles.projectContent}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ marginBottom: '0.25rem' }}>{msg.subject}</h3>
                                            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                                From: <strong style={{ color: '#0f172a' }}>{msg.name}</strong>
                                            </p>
                                            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{msg.email}</p>
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: '#94a3b8',
                                            backgroundColor: '#f1f5f9',
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '4px'
                                        }}>
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div style={{
                                        padding: '1.25rem',
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '8px',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        color: '#334155',
                                        whiteSpace: 'pre-wrap',
                                        marginBottom: '1.5rem',
                                        border: '1px solid #f1f5f9'
                                    }}>
                                        {msg.message}
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button
                                            onClick={() => toggleReadStatus(msg._id, msg.read)}
                                            className={styles.editBtn}
                                            style={{ backgroundColor: msg.read ? '#f1f5f9' : 'var(--accent)', color: msg.read ? '#0f172a' : 'white' }}
                                        >
                                            {msg.read ? "Mark Unread" : "Mark as Read"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
