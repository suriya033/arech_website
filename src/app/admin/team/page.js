"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "../admin.module.css";

export default function TeamManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
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
                setShowForm(false);
                alert(editingId ? "Member updated successfully!" : "Member added successfully!");
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
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this member?")) return;

        try {
            const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchMembers();
                alert("Member deleted successfully.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete member.");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowForm(false);
        setFormData({ name: "", role: "", image: "", description: "", order: 0, email: "", phone: "" });
    };

    if (status === "loading" || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading Team...</p>
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
                        <h1>Team Management</h1>
                        <p>Manage the creative minds behind your architectural firm.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className={styles.addBtn}
                        >
                            <span>+</span> Add Team Member
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>{editingId ? "Edit Team Member" : "Add New Member"}</h2>
                            <button onClick={handleCancel} className={styles.closeBtn}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="e.g. John Doe"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                        placeholder="e.g. Principal Architect"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label>Sort Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label>Email (Optional)</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label>Phone (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 ..."
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label>Biography</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    placeholder="Briefly describe their background and expertise..."
                                />
                            </div>

                            <div className={styles.uploadSection}>
                                <ImageUpload
                                    label="Profile Image"
                                    value={formData.image}
                                    onChange={(value) => setFormData({ ...formData, image: value })}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingId ? "Update Member" : "Save Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Total Members</span>
                        <span className={styles.statValue}>{members.length}</span>
                    </div>
                </div>

                <div className={styles.projectGrid}>
                    {members.map((member) => (
                        <div key={member._id} className={styles.projectCard}>
                            <div className={styles.projectImage}>
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.categoryBadge}>Order: {member.order}</div>
                            </div>
                            <div className={styles.projectContent}>
                                <h3>{member.name}</h3>
                                <p className={styles.location}>
                                    <span>👤</span> {member.role}
                                </p>
                                {member.email && <p className={styles.description}>📧 {member.email}</p>}
                                {member.phone && <p className={styles.description}>📞 {member.phone}</p>}
                                <div className={styles.cardActions}>
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className={styles.editBtn}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
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
