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
        linkedin: "",
        ongoingProjects: 0,
        completedProjects: 0,
        publications: 0
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
            const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
            const data = await res.json();
            console.log("Fetched settings:", data);

            // Extract values, handling both direct properties and nested _doc
            const extractValue = (obj, key, defaultVal) => {
                if (obj[key] !== undefined && obj[key] !== null) return obj[key];
                if (obj._doc && obj._doc[key] !== undefined && obj._doc[key] !== null) return obj._doc[key];
                return defaultVal;
            };

            setFormData({
                email: extractValue(data, 'email', ""),
                phone: extractValue(data, 'phone', ""),
                address: extractValue(data, 'address', ""),
                googleMapUrl: extractValue(data, 'googleMapUrl', ""),
                instagram: extractValue(data, 'instagram', ""),
                whatsapp: extractValue(data, 'whatsapp', ""),
                linkedin: extractValue(data, 'linkedin', ""),
                ongoingProjects: Number(extractValue(data, 'ongoingProjects', 0)),
                completedProjects: Number(extractValue(data, 'completedProjects', 0)),
                publications: Number(extractValue(data, 'publications', 0))
            });
            console.log("Form data set with:", {
                ongoingProjects: Number(extractValue(data, 'ongoingProjects', 0)),
                completedProjects: Number(extractValue(data, 'completedProjects', 0)),
                publications: Number(extractValue(data, 'publications', 0))
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
            // Ensure numbers are properly parsed
            const dataToSend = {
                ...formData,
                ongoingProjects: Number(formData.ongoingProjects) || 0,
                completedProjects: Number(formData.completedProjects) || 0,
                publications: Number(formData.publications) || 0
            };

            console.log("Sending data:", dataToSend);
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (res.ok) {
                const updatedData = await res.json();
                console.log("Received updated data:", updatedData);
                console.log("ongoingProjects:", updatedData.ongoingProjects);
                console.log("completedProjects:", updatedData.completedProjects);
                console.log("publications:", updatedData.publications);

                // Ensure the updated data has proper number types
                const normalizedData = {
                    email: updatedData.email || "",
                    phone: updatedData.phone || "",
                    address: updatedData.address || "",
                    googleMapUrl: updatedData.googleMapUrl || "",
                    instagram: updatedData.instagram || "",
                    whatsapp: updatedData.whatsapp || "",
                    linkedin: updatedData.linkedin || "",
                    ongoingProjects: Number(updatedData.ongoingProjects) || 0,
                    completedProjects: Number(updatedData.completedProjects) || 0,
                    publications: Number(updatedData.publications) || 0
                };

                console.log("Normalized data to set:", normalizedData);
                setFormData(normalizedData);
                alert("Settings updated successfully!");
            } else {
                const errorData = await res.json();
                console.error("Update failed:", errorData);
                alert("Failed to update settings: " + (errorData.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong: " + error.message);
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

                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginTop: '3rem' }}>Company Statistics</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem',
                    backgroundColor: '#f9f9f9',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>
                    {['ongoingProjects', 'completedProjects', 'publications'].map((stat) => (
                        <div key={stat} style={{ textAlign: 'center' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', textTransform: 'capitalize', color: 'var(--foreground)' }}>
                                {stat.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, [stat]: Math.max(0, (prev[stat] || 0) - 1) }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={formData[stat]}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setFormData(prev => ({ ...prev, [stat]: isNaN(val) ? 0 : val }));
                                    }}
                                    style={{
                                        width: '80px',
                                        padding: '0.5rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: 'var(--primary)'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, [stat]: (prev[stat] || 0) + 1 }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            style={{
                                padding: '0.75rem 2rem',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            Update Statistics
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn">
                    Save Settings
                </button>
            </form>
        </div>
    );
}
