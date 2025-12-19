"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ServicesManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/services";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { _id: editingId, ...formData } : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchServices();
                setFormData({ title: "", description: "", icon: "" });
                setEditingId(null);
                alert(editingId ? "Service updated!" : "Service added!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon || ""
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchServices();
                alert("Service deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ title: "", description: "", icon: "" });
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>{editingId ? "Edit" : "Add"} Service</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '600px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Service Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g., Architectural Design"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        placeholder="Describe the service..."
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Icon/Emoji (Optional)</label>
                    <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="e.g., 🏗️ or 🎨"
                        maxLength={2}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn">
                        {editingId ? "Update Service" : "Add Service"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginBottom: '1.5rem' }}>Services ({services.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {services.map((service) => (
                    <div
                        key={service._id}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--background)'
                        }}
                    >
                        {service.icon && (
                            <div style={{ fontSize: '2.5rem' }}>{service.icon}</div>
                        )}
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{service.description}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(service)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service._id)}
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
                    </div>
                ))}
            </div>
        </div>
    );
}
