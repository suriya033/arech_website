"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminCareers() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/careers/apply");
            const data = await res.json();
            setApplications(data);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        setApplications(apps => apps.map(app =>
            app._id === id ? { ...app, status: newStatus } : app
        ));

        try {
            const res = await fetch(`/api/careers/apply/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update");
        } catch (error) {
            console.error("Failed to update status:", error);
            fetchApplications();
        }
    };

    const deleteApplication = async (id) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

        setApplications(apps => apps.filter(app => app._id !== id));

        try {
            const res = await fetch(`/api/careers/apply/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error("Failed to delete");
        } catch (error) {
            console.error("Failed to delete application:", error);
            fetchApplications();
        }
    };

    const filteredApps = filter === "All"
        ? applications
        : applications.filter(app => app.status === filter);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #eee', borderTopColor: '#333', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111', marginBottom: '0.5rem' }}>Career Applications</h1>
                    <p style={{ color: '#666' }}>Manage internship and job applications.</p>
                </div>
                <Link href="/admin" style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', transition: 'background 0.2s' }}>
                    ← Back to Dashboard
                </Link>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {['All', 'New', 'Reviewed', 'Contacted', 'Hired', 'Rejected'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '50px',
                            border: '1px solid',
                            borderColor: filter === status ? 'var(--primary)' : '#e5e7eb',
                            background: filter === status ? 'var(--primary)' : 'white',
                            color: filter === status ? 'white' : '#4b5563',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Candidate</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Role & Details</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Experience/Edu</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApps.map((app) => (
                                <tr key={app._id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ fontWeight: '600', color: '#111', fontSize: '1rem' }}>{app.name}</div>
                                        <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>{app.email}</div>
                                        <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {new Date(app.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            background: app.type === 'Internship' ? '#eff6ff' : '#f0fdf4',
                                            color: app.type === 'Internship' ? '#1d4ed8' : '#15803d',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {app.type}
                                        </span>
                                        <div style={{ fontSize: '0.875rem', color: '#374151' }}>{app.institute}</div>
                                    </td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                                        {app.type === 'Internship' ? (
                                            <div>
                                                <strong>Duration:</strong> {app.duration || 'N/A'}
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <div><strong>Exp:</strong> {app.experience || 'N/A'}</div>
                                                <div><strong>Grad:</strong> {app.graduationYear || 'N/A'}</div>
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <select
                                            value={app.status}
                                            onChange={(e) => updateStatus(app._id, e.target.value)}
                                            style={{
                                                padding: '0.375rem 2rem 0.375rem 0.75rem',
                                                borderRadius: '6px',
                                                border: '1px solid #d1d5db',
                                                fontSize: '0.875rem',
                                                color: '#374151',
                                                background: 'white',
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="New">New</option>
                                            <option value="Reviewed">Reviewed</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Hired">Hired</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    color: '#2563eb',
                                                    background: '#eff6ff',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#dbeafe'}
                                                onMouseOut={(e) => e.currentTarget.style.background = '#eff6ff'}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => deleteApplication(app._id)}
                                                style={{
                                                    padding: '0.5rem',
                                                    color: '#ef4444',
                                                    background: 'transparent',
                                                    border: '1px solid #fee2e2',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredApps.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                        <p>No applications found with status "{filter}".</p>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {selectedApp && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '1rem'
                }} onClick={() => setSelectedApp(null)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '650px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '2.5rem',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedApp(null)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#f3f4f6',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                color: '#4b5563',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.style.color = '#111'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            ×
                        </button>

                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111' }}>{selectedApp.name}</h2>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    background: selectedApp.type === 'Internship' ? '#eff6ff' : '#f0fdf4',
                                    color: selectedApp.type === 'Internship' ? '#1d4ed8' : '#15803d'
                                }}>
                                    {selectedApp.type}
                                </span>
                                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>•</span>
                                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{selectedApp.status}</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Email</label>
                                    <div style={{ fontSize: '1rem' }}><a href={`mailto:${selectedApp.email}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>{selectedApp.email}</a></div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Institute</label>
                                    <div style={{ fontSize: '1rem', color: '#111' }}>{selectedApp.institute}</div>
                                </div>
                            </div>

                            {selectedApp.type === 'Internship' ? (
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Duration</label>
                                    <div style={{ fontSize: '1rem', color: '#111' }}>{selectedApp.duration}</div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Experience</label>
                                        <div style={{ fontSize: '1rem', color: '#111' }}>{selectedApp.experience}</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Graduation Year</label>
                                        <div style={{ fontSize: '1rem', color: '#111' }}>{selectedApp.graduationYear}</div>
                                    </div>
                                    {selectedApp.qualification && (
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Additional Qualification</label>
                                            <div style={{ fontSize: '1rem', color: '#111' }}>{selectedApp.qualification}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>Cover Letter / Details</label>
                                <div style={{
                                    background: '#f9fafb',
                                    padding: '1.25rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '0.95rem',
                                    color: '#374151',
                                    lineHeight: '1.6'
                                }}>
                                    {selectedApp.details || "No additional details provided."}
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'block' }}>Portfolio & Attachments</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {selectedApp.portfolioLink && (
                                        <a href={selectedApp.portfolioLink} target="_blank" rel="noopener noreferrer" style={{
                                            padding: '0.75rem 1rem',
                                            background: '#eff6ff',
                                            border: '1px solid #dbeafe',
                                            borderRadius: '8px',
                                            color: '#2563eb',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '500',
                                            transition: 'background 0.2s'
                                        }}>
                                            🔗 View Online Portfolio
                                        </a>
                                    )}
                                    {selectedApp.portfolio && (
                                        <a href={selectedApp.portfolio} download={`portfolio-${selectedApp.name}`} style={{
                                            padding: '0.75rem 1rem',
                                            background: '#f0fdf4',
                                            border: '1px solid #dcfce7',
                                            borderRadius: '8px',
                                            color: '#16a34a',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '500'
                                        }}>
                                            📄 Download Portfolio File
                                        </a>
                                    )}
                                    {selectedApp.attachments && selectedApp.attachments.map((att, idx) => (
                                        <a key={idx} href={att} download={`attachment-${idx + 1}-${selectedApp.name}`} style={{
                                            padding: '0.75rem 1rem',
                                            background: '#f9fafb',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            color: '#4b5563',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '500'
                                        }}>
                                            📎 Download Attachment {idx + 1}
                                        </a>
                                    ))}
                                    {!selectedApp.portfolioLink && !selectedApp.portfolio && (!selectedApp.attachments || selectedApp.attachments.length === 0) && (
                                        <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
                                            No files attached.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setSelectedApp(null)}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: '#111',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#333'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
