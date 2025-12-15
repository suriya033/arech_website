"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function TeamManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        image: "",
        description: "",
        order: 0,
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            setMembers(data);
        } catch (error) {
            console.error("Failed to fetch members:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/team";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { _id: editingId, ...formData } : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchMembers();
                setFormData({ name: "", role: "", image: "", description: "", order: 0, email: "", phone: "" });
                setEditingId(null);
                alert(editingId ? "Member updated!" : "Member added!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (member) => {
        setEditingId(member._id);
        setFormData({
            name: member.name,
            role: member.role,
            image: member.image,
            description: member.description || "",
            order: member.order || 0,
            email: member.email || "",
            phone: member.phone || ""
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this member?")) return;

        try {
            const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchMembers();
                alert("Member deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ name: "", role: "", image: "", description: "", order: 0, email: "", phone: "" });
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>{editingId ? "Edit" : "Add"} Team Member</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '600px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Order (Sort)</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email (Optional)</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone (Optional)</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <ImageUpload
                    label="Profile Image"
                    value={formData.image}
                    onChange={(value) => setFormData({ ...formData, image: value })}
                />

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Optional)</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn">
                        {editingId ? "Update Member" : "Add Member"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginBottom: '1.5rem' }}>Team Members ({members.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {members.map((member) => (
                    <div
                        key={member._id}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--background)'
                        }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{member.name}</h3>
                            <p style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{member.role}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order: {member.order}</p>
                            {member.email && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📧 {member.email}</p>}
                            {member.phone && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📞 {member.phone}</p>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(member)}
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
                                onClick={() => handleDelete(member._id)}
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
