"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--secondary)' }}>
            {status === "success" ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Message Sent!</h3>
                    <p>Thank you for contacting us. We will get back to you shortly.</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="btn-outline"
                        style={{ marginTop: '1.5rem' }}
                    >
                        Send Another Message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                        >
                            <option>General Inquiry</option>
                            <option>New Project</option>
                            <option>Career</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                        <textarea
                            rows="5"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            placeholder="Tell us about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%' }}
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>
                    {status === "error" && <p style={{ color: 'red', textAlign: 'center' }}>Failed to send message. Please try again.</p>}
                </form>
            )}
        </div>
    );
}
