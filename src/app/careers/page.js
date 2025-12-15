"use client";

import { useState, useRef, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import styles from "./careers.module.css";

export default function Careers() {
    const [openSection, setOpenSection] = useState(null);
    const internshipRef = useRef(null);
    const jobRef = useRef(null);

    const toggleSection = (section) => {
        const isOpening = openSection !== section;
        setOpenSection(isOpening ? section : null);

        if (isOpening) {
            // Wait for state update and DOM render
            setTimeout(() => {
                const ref = section === 'internship' ? internshipRef : jobRef;
                if (ref.current) {
                    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };

    return (
        <main>
            <PageHeader
                title="Careers"
                description="Join our team and help us create timeless spaces."
            />

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.intro}>
                        <h2>Work With Us</h2>
                        <p>
                            At Varsha and Pradeep, we are always looking for talented individuals who share our passion for design and innovation.
                            Whether you are starting your career or looking for the next big challenge, we offer a collaborative environment where you can grow.
                        </p>
                    </div>

                    <div className={styles.accordion}>
                        {/* Internship Section */}
                        <div
                            ref={internshipRef}
                            className={`${styles.item} ${openSection === 'internship' ? styles.active : ''}`}
                        >
                            <button
                                className={styles.header}
                                onClick={() => toggleSection('internship')}
                            >
                                <h3>Internship Program</h3>
                                <span className={styles.icon}>{openSection === 'internship' ? '−' : '+'}</span>
                            </button>
                            <div className={styles.content}>
                                <div className={styles.innerContent}>
                                    <p>
                                        Our internship program is designed to provide hands-on experience in architectural and interior design.
                                        You will work closely with our senior architects and designers on real-world projects.
                                    </p>
                                    <h4>Requirements:</h4>
                                    <ul>
                                        <li>Current student or recent graduate in Architecture or Interior Design.</li>
                                        <li>Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite.</li>
                                        <li>Strong portfolio demonstrating design thinking.</li>
                                        <li>Eagerness to learn and contribute to a team.</li>
                                    </ul>
                                    <p>
                                        <strong>To Apply:</strong> Fill out the form below or send your portfolio and resume to <a href="mailto:pradeep_vparchitects@yahoo.co.in">pradeep_vparchitects@yahoo.co.in</a>.
                                    </p>
                                    <CareerApplicationForm type="Internship" />
                                </div>
                            </div>
                        </div>

                        {/* Part of Varsha and Pradeep Section */}
                        <div
                            ref={jobRef}
                            className={`${styles.item} ${openSection === 'join' ? styles.active : ''}`}
                        >
                            <button
                                className={styles.header}
                                onClick={() => toggleSection('join')}
                            >
                                <h3>Part of Varsha and Pradeep</h3>
                                <span className={styles.icon}>{openSection === 'join' ? '−' : '+'}</span>
                            </button>
                            <div className={styles.content}>
                                <div className={styles.innerContent}>
                                    <p>
                                        We are looking for experienced architects and designers to join our core team.
                                        If you have a passion for detail, a strong work ethic, and a desire to lead projects from concept to completion, we want to hear from you.
                                    </p>
                                    <h4>Open Positions:</h4>
                                    <ul>
                                        <li><strong>Senior Architect:</strong> 5+ years of experience in residential and commercial projects.</li>
                                        <li><strong>Interior Designer:</strong> 3+ years of experience with a strong portfolio in luxury interiors.</li>
                                        <li><strong>Project Manager:</strong> Experience in site coordination and vendor management.</li>
                                    </ul>
                                    <p>
                                        <strong>To Apply:</strong> Fill out the form below or send your CV and portfolio to <a href="mailto:pradeep_vparchitects@yahoo.co.in">pradeep_vparchitects@yahoo.co.in</a>.
                                    </p>
                                    <CareerApplicationForm type="Job" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
