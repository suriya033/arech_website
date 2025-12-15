"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function ProjectsManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "Residential",
        location: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/projects";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { _id: editingId, ...formData } : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchProjects();
                setFormData({ title: "", category: "Residential", location: "", image: "", description: "" });
                setEditingId(null);
                alert(editingId ? "Project updated!" : "Project added!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            category: project.category,
            location: project.location,
            image: project.image,
            description: project.description || ""
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
                alert("Project deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ title: "", category: "Residential", location: "", image: "", description: "" });
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>{editingId ? "Edit" : "Add"} Project</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '600px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Interior">Interior</option>
                        <option value="Landscape">Landscape</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <ImageUpload
                    label="Project Image"
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
                        {editingId ? "Update Project" : "Add Project"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginBottom: '1.5rem' }}>Projects ({projects.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {projects.map((project) => (
                    <div
                        key={project._id}
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
                            src={project.image}
                            alt={project.title}
                            style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                            <p style={{ color: 'var(--accent)', marginBottom: '0.25rem' }}>{project.category}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{project.location}</p>
                            {project.description && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.description}</p>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(project)}
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
                                onClick={() => handleDelete(project._id)}
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
