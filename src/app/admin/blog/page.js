"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MultiImageUpload from "@/components/MultiImageUpload";

export default function BlogManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        images: [],
        author: "Admin"
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/blog";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { _id: editingId, ...formData } : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchBlogs();
                setFormData({ title: "", excerpt: "", content: "", image: "", images: [], author: "Admin" });
                setEditingId(null);
                alert(editingId ? "Blog updated!" : "Blog published!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (blog) => {
        setEditingId(blog._id);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image,
            images: blog.images || [blog.image],
            author: blog.author || "Admin"
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchBlogs();
                alert("Blog deleted!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ title: "", excerpt: "", content: "", image: "", images: [], author: "Admin" });
    };

    if (status === "loading" || loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    if (!session) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>{editingId ? "Edit" : "Create"} Blog Post</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '800px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Enter blog title..."
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '1.1rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Excerpt</label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        rows={2}
                        placeholder="Short summary (shown in blog list)..."
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}
                    />
                </div>

                <MultiImageUpload
                    label="Blog Images"
                    values={formData.images && formData.images.length > 0 ? formData.images : (formData.image ? [formData.image] : [])}
                    onChange={(values) => setFormData({ ...formData, images: values, image: values[0] || "" })}
                />

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Content</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={12}
                        placeholder="Write your blog content here..."
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Author</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Author name"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn">
                        {editingId ? "Update Post" : "Publish Post"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 style={{ marginBottom: '1.5rem' }}>Blog Posts ({blogs.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
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
                            src={blog.image}
                            alt={blog.title}
                            style={{ width: '200px', height: '130px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{blog.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                By {blog.author} • {new Date(blog.date).toLocaleDateString()}
                            </p>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{blog.excerpt}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(blog)}
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
                                onClick={() => handleDelete(blog._id)}
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
