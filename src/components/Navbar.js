"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    Varsha and Pradeep
                </Link>

                <nav>
                    <ul className={`${styles.links} ${isOpen ? styles.open : ''}`}>
                        <li><Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li><Link href="/about" className={styles.link} onClick={() => setIsOpen(false)}>About</Link></li>
                        <li><Link href="/projects" className={styles.link} onClick={() => setIsOpen(false)}>Projects</Link></li>
                        <li><Link href="/services" className={styles.link} onClick={() => setIsOpen(false)}>Services</Link></li>
                        <li><Link href="/blog" className={styles.link} onClick={() => setIsOpen(false)}>Blog</Link></li>
                    </ul>
                </nav>

                <Link href="/contact" className={`btn ${styles.cta}`}>
                    Get a Quote
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
