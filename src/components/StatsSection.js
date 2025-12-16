"use client";

import { useState, useEffect } from "react";

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
        <section className="section container" style={{ padding: '4rem 2rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                textAlign: 'center'
            }}>
                <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {stats.ongoingProjects}+
                    </div>
                    <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Ongoing Projects</div>
                </div>
                <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {stats.completedProjects}+
                    </div>
                    <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Completed Projects</div>
                </div>
                <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {stats.publications}+
                    </div>
                    <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Publications</div>
                </div>
            </div>
        </section>
    );
}
