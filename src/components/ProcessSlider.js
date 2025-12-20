"use client";

import { useState } from 'react';
import styles from './ProcessSlider.module.css';

export default function ProcessSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const steps = [
        { title: 'Consultation', icon: '🤝', desc: 'Initial meeting to understand your vision, budget, and project requirements in detail.' },
        { title: 'Concept Design', icon: '✍️', desc: 'Developing the core architectural concepts, spatial layouts, and initial sketches.' },
        { title: 'Development', icon: '📐', desc: 'Refining designs with technical precision, 3D modeling, and material selection.' },
        { title: 'Execution', icon: '🏗️', desc: 'Overseeing the construction process to ensure every detail aligns with the vision.' },
        { title: 'Handover', icon: '🔑', desc: 'Final inspection, quality assurance, and delivering your completed architectural masterpiece.' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                {steps.map((step, i) => (
                    <button
                        key={i}
                        className={`${styles.navItem} ${activeIndex === i ? styles.active : ''}`}
                        onClick={() => setActiveIndex(i)}
                    >
                        <span className={styles.stepNum}>{i + 1}</span>
                        <span className={styles.stepTitle}>{step.title}</span>
                    </button>
                ))}
            </div>

            <div className={styles.contentWrapper}>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className={`${styles.slide} ${activeIndex === i ? styles.active : ''}`}
                    >
                        <div className={styles.slideInner}>
                            <div className={styles.iconBox}>
                                {step.icon}
                            </div>
                            <div className={styles.textBox}>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                <div className={styles.stepIndicator}>
                                    Step {i + 1} of {steps.length}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.mobileControls}>
                <button
                    onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                >
                    Previous
                </button>
                <button
                    onClick={() => setActiveIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={activeIndex === steps.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
