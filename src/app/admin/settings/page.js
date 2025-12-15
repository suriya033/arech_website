"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SiteSettings() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        address: "",
        googleMapUrl: "",
        instagram: "",
        whatsapp: "",
        linkedin: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setFormData({
                email: data.email || "",
                phone: data.phone || "",
                address: data.address || "",
                googleMapUrl: data.googleMapUrl || "",
                instagram: data.instagram || "",
                whatsapp: data.whatsapp || "",
                linkedin: data.linkedin || ""
            });
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Settings updated successfully!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Site Settings & Contact Info</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '800px' }}>

                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Contact Information</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Physical Address</label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Google Map Embed URL</label>
                    <input
                        type="text"
                        value={formData.googleMapUrl}
                        onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })}
                        placeholder="Paste the 'src' attribute from Google Maps Embed code"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Go to Google Maps {'>'} Share {'>'} Embed a map {'>'} Copy HTML {'>'} Extract the URL inside src="..."
                    </p>
                </div>

                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Social Media Links</h3>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Instagram URL</label>
                    <input
                        type="url"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>WhatsApp Link</label>
                    <input
                        type="url"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="https://wa.me/..."
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>LinkedIn URL</label>
                    <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <button type="submit" className="btn">
                    Save Settings
                </button>
            </form>
        </div>
    );
}
