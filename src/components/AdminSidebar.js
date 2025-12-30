"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
        { name: "Projects", path: "/admin/projects", icon: "🏗️" },
        { name: "Team", path: "/admin/team", icon: "👥" },
        { name: "Testimonials", path: "/admin/testimonials", icon: "💬" },
        { name: "Careers", path: "/admin/careers", icon: "💼" },
        { name: "Messages", path: "/admin/messages", icon: "📬" },
        { name: "Settings", path: "/admin/settings", icon: "🛠️" },
    ];

    return (
        <>
            {/* Mobile Header & Menu Bar */}
            <div className={styles.mobileAdminNav}>
                <div className={styles.mobileHeader}>
                    <div className={styles.mobileLogo}>
                        <h2>Varsha and Pradeep ARCH <span>ADMIN</span></h2>
                    </div>
                    <button
                        className={`${styles.menuToggle} ${isOpen ? styles.active : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>


            </div>

            {/* Sidebar Overlay */}
            {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

            {/* Sidebar (Drawer for mobile, permanent for desktop) */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <div className={styles.logo}>
                    <h2>Admin Panel</h2>
                </div>
                <nav className={styles.nav}>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={pathname === item.path ? styles.active : ""}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    <span className={styles.name}>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className={styles.logoutBtn}
                >
                    <span className={styles.icon}>🚪</span>
                    <span className={styles.name}>Logout</span>
                </button>
            </aside>
        </>
    );
}
