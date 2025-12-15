"use client";

import { useState } from "react";
import MultiImageUpload from "@/components/MultiImageUpload";

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
            <div style={{ padding: '2rem', textAlign: 'center', background: '#f0fdf4', borderRadius: '8px', color: '#166534' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Application Received! 🎉</h3>
                <p>Thank you for applying. We will review your application and get back to you soon.</p>
                <button
                    onClick={() => setStatus("idle")}
                    style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#166534', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                Apply for {type}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Institute / University *</label>
                <input
                    type="text"
                    required
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>

            {/* Internship Specific Fields */}
            {type === "Internship" && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Internship Duration *</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. 6 months"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
            )}

            {/* Job Specific Fields */}
            {type === "Job" && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Year of Graduation *</label>
                            <input
                                type="text"
                                required
                                value={formData.graduationYear}
                                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Work Experience *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 2 years"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Additional Qualification</label>
                        <input
                            type="text"
                            placeholder="e.g. Master's in Urban Design"
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                </>
            )}

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Online Portfolio Link</label>
                <input
                    type="url"
                    placeholder="https://..."
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>

            <div>
                <MultiImageUpload
                    label="Upload Portfolio (Image or PDF URL)"
                    values={formData.portfolio ? [formData.portfolio] : []}
                    onChange={handlePortfolioChange}
                />
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '-1rem', marginBottom: '1rem' }}>
                    * Upload your portfolio cover or main document.
                </p>
            </div>

            <div>
                <MultiImageUpload
                    label="Other Attachments (CV, Certificates, etc.)"
                    values={formData.attachments}
                    onChange={handleAttachmentsChange}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Other Details / Cover Letter</label>
                <textarea
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                ></textarea>
            </div>

            {status === "error" && (
                <div style={{ color: 'red', fontSize: '0.9rem' }}>
                    Something went wrong. Please try again.
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                    padding: '1rem 2rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    cursor: status === "submitting" ? 'not-allowed' : 'pointer',
                    opacity: status === "submitting" ? 0.7 : 1
                }}
            >
                {status === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}
