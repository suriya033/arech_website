"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function TestimonialsManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        image: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/testimonials";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { _id: editingId, ...formData } : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchTestimonials();
                setFormData({ name: "", role: "", content: "", image: "" });
                setEditingId(null);
                alert(editingId ? "Testimonial updated!" : "Testimonial added!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            image: item.image || ""
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchTestimonials();
                alert("Testimonial deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ name: "", role: "", content: "", image: "" });
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>{editingId ? "Edit" : "Add"} Testimonial</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '600px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Client Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role / Project</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                        placeholder="e.g. CEO, Tech Corp OR Residential Project"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <ImageUpload
                    label="Client Photo (Optional)"
                    value={formData.image}
                    onChange={(value) => setFormData({ ...formData, image: value })}
                />

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Testimonial Content</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={4}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn">
                        {editingId ? "Update Testimonial" : "Add Testimonial"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginBottom: '1.5rem' }}>Testimonials ({testimonials.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {testimonials.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--background)'
                        }}
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.25rem' }}>{item.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{item.role}</p>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{item.content}"</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(item)}
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
                                onClick={() => handleDelete(item._id)}
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
