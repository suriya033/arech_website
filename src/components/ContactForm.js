import { useState } from "react";
import styles from "./ContactForm.module.css";

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
        <div className={styles.container}>
            {status === "success" ? (
                <div className={styles.successContainer}>
                    <h3 className={styles.successTitle}>Message Sent! 🎉</h3>
                    <p>Thank you for contacting us. We will get back to you shortly.</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className={styles.submitBtn}
                        style={{ marginTop: '1.5rem', padding: '0.75rem 2rem' }}
                    >
                        Send Another Message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            placeholder="Your Name"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={styles.input}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Subject</label>
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className={styles.select}
                        >
                            <option>General Inquiry</option>
                            <option>New Project</option>
                            <option>Career</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Message</label>
                        <textarea
                            rows="5"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={styles.textarea}
                            placeholder="Tell us about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>
                    {status === "error" && <p className={styles.error}>Failed to send message. Please try again.</p>}
                </form>
            )}
        </div>
    );
}

