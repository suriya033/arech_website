"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const ctaRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const cta = ctaRef.current;
        if (!cta) return;

        const handleMouseMove = (e) => {
            const rect = cta.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            cta.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        };

        const handleMouseLeave = () => {
            cta.style.transform = `translate(0, 0)`;
        };

        cta.addEventListener("mousemove", handleMouseMove);
        cta.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cta.removeEventListener("mousemove", handleMouseMove);
            cta.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    varsha and pradeep architects
                </Link>

                <nav>
                    <ul className={`${styles.links} ${isOpen ? styles.open : ''}`}>
                        <li><Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li><Link href="/about" className={styles.link} onClick={() => setIsOpen(false)}>About</Link></li>
                        <li><Link href="/projects" className={styles.link} onClick={() => setIsOpen(false)}>Projects</Link></li>
                        <li><Link href="/services" className={styles.link} onClick={() => setIsOpen(false)}>Services</Link></li>
                        <li><Link href="/careers" className={styles.link} onClick={() => setIsOpen(false)}>Careers</Link></li>
                    </ul>
                </nav>

                <Link
                    href="/contact"
                    className={`btn ${styles.cta}`}
                    ref={ctaRef}
                >
                    Contact US
                </Link>

                <button
                    className={`${styles.mobileMenuBtn} ${isOpen ? styles.active : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </div>
        </header>
    );
}
