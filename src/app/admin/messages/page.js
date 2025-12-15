"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
                alert("Message deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Contact Messages</h1>

            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {messages.map((msg) => (
                        <div key={msg._id} style={{
                            padding: '1.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>{msg.subject}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        From: <strong>{msg.name}</strong> ({msg.email})
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'var(--error)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
