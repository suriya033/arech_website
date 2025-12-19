"use client";

import { useState } from "react";
import MultiImageUpload from "@/components/MultiImageUpload";
import styles from "./CareerApplicationForm.module.css";

export default function CareerApplicationForm({ type }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        institute: "",
        duration: "", // Internship
        graduationYear: "", // Job
        qualification: "", // Job
        experience: "", // Job
        portfolioLink: "",
        details: "",
        portfolio: "",
        attachments: []
    });
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/careers/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, type }),
            });

            if (!res.ok) throw new Error("Submission failed");

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                institute: "",
                duration: "",
                graduationYear: "",
                qualification: "",
                experience: "",
                portfolioLink: "",
                details: "",
                portfolio: "",
                attachments: []
            });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const handlePortfolioChange = (urls) => {
        setFormData({ ...formData, portfolio: urls[0] || "" });
    };

    const handleAttachmentsChange = (urls) => {
        setFormData({ ...formData, attachments: urls });
    };

    if (status === "success") {
        return (
            <div className={styles.successContainer}>
                <h3 className={styles.successTitle}>Application Received! 🎉</h3>
                <p>Thank you for applying. We will review your application and get back to you soon.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className={styles.successBtn}
                >
                    Submit Another Application
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h4 className={styles.title}>
                Apply for {type}
            </h4>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Full Name *</label>
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
                    <label className={styles.label}>Email Address *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.input}
                        placeholder="your@email.com"
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Institute / University *</label>
                <input
                    type="text"
                    required
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    className={styles.input}
                    placeholder="Where did you study?"
                />
            </div>

            {/* Internship Specific Fields */}
            {type === "Internship" && (
                <div className={styles.field}>
                    <label className={styles.label}>Internship Duration *</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. 6 months"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className={styles.input}
                    />
                </div>
            )}

            {/* Job Specific Fields */}
            {type === "Job" && (
                <>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Year of Graduation *</label>
                            <input
                                type="text"
                                required
                                value={formData.graduationYear}
                                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                                className={styles.input}
                                placeholder="YYYY"
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Work Experience *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 2 years"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Additional Qualification</label>
                        <input
                            type="text"
                            placeholder="e.g. Master's in Urban Design"
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                </>
            )}

            <div className={styles.field}>
                <label className={styles.label}>Online Portfolio Link</label>
                <input
                    type="url"
                    placeholder="https://..."
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <MultiImageUpload
                    label="Upload Portfolio (Image or PDF URL)"
                    values={formData.portfolio ? [formData.portfolio] : []}
                    onChange={handlePortfolioChange}
                />
                <p className={styles.helperText}>
                    * Upload your portfolio cover or main document.
                </p>
            </div>

            <div className={styles.field}>
                <MultiImageUpload
                    label="Other Attachments (CV, Certificates, etc.)"
                    values={formData.attachments}
                    onChange={handleAttachmentsChange}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Other Details / Cover Letter</label>
                <textarea
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className={styles.textarea}
                    placeholder="Tell us why you'd like to join our team..."
                ></textarea>
            </div>

            {status === "error" && (
                <div className={styles.error}>
                    Something went wrong. Please try again.
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className={styles.submitBtn}
            >
                {status === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}
