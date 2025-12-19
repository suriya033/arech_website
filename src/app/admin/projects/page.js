"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MultiImageUpload from "@/components/MultiImageUpload";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "../admin.module.css";

export default function ProjectsManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "Residential",
        location: "",
        image: "",
        images: [],
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
                setFormData({ title: "", category: "Residential", location: "", image: "", images: [], description: "" });
                setEditingId(null);
                setShowForm(false);
                alert(editingId ? "Project updated successfully!" : "Project added successfully!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            category: project.category,
            location: project.location,
            image: project.image,
            images: project.images || [project.image],
            description: project.description || ""
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
                alert("Project deleted successfully.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete project.");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowForm(false);
        setFormData({ title: "", category: "Residential", location: "", image: "", images: [], description: "" });
    };

    if (status === "loading" || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading Projects...</p>
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
                        <h1>Projects Management</h1>
                        <p>Manage your architectural portfolio and showcase your best work.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className={styles.addBtn}
                        >
                            <span>+</span> Add New Project
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>
                            <button onClick={handleCancel} className={styles.closeBtn}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label>Project Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="e.g. Modern Villa"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Interior">Interior</option>
                                        <option value="Landscape">Landscape</option>
                                    </select>
                                </div>

                                <div className={styles.field}>
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        placeholder="e.g. Chennai, India"
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    placeholder="Describe the project details, challenges, and outcomes..."
                                />
                            </div>

                            <div className={styles.uploadSection}>
                                <MultiImageUpload
                                    label="Project Images"
                                    values={formData.images || (formData.image ? [formData.image] : [])}
                                    onChange={(values) => setFormData({ ...formData, images: values, image: values[0] || "" })}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingId ? "Update Project" : "Save Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Total Projects</span>
                        <span className={styles.statValue}>{projects.length}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Categories</span>
                        <span className={styles.statValue}>
                            {[...new Set(projects.map(p => p.category))].length}
                        </span>
                    </div>
                </div>

                <div className={styles.projectGrid}>
                    {projects.map((project) => (
                        <div key={project._id} className={styles.projectCard}>
                            <div className={styles.projectImage}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.categoryBadge}>{project.category}</div>
                            </div>
                            <div className={styles.projectContent}>
                                <h3>{project.title}</h3>
                                <p className={styles.location}>
                                    <span>📍</span> {project.location}
                                </p>
                                {project.description && (
                                    <p className={styles.description}>{project.description}</p>
                                )}
                                <div className={styles.cardActions}>
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className={styles.editBtn}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
