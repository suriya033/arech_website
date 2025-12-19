"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

import styles from "../admin.module.css";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
        { name: "Manage Team", path: "/admin/team", icon: "👥" },
        { name: "Manage Projects", path: "/admin/projects", icon: "🏗️" },
        { name: "Manage Services", path: "/admin/services", icon: "⚙️" },
        { name: "Manage Testimonials", path: "/admin/testimonials", icon: "💬" },
        { name: "Manage Careers", path: "/admin/careers", icon: "💼" },
        { name: "Messages", path: "/admin/messages", icon: "📬" },
        { name: "Site Settings", path: "/admin/settings", icon: "🛠️" },
    ];

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={pathname === item.path ? styles.active : ""}
                                >
                                    <span style={{ marginRight: '10px' }}>{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className={styles.logoutBtn}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <h1>Welcome, {session?.user?.email?.split('@')[0]}</h1>
                <p>Manage your website content and monitor activity from your dashboard.</p>

                <div className={styles.grid}>
                    {navItems.slice(1).map((item) => (
                        <Link href={item.path} key={item.path} className={styles.card}>
                            <div className={styles.cardIcon}>{item.icon}</div>
                            <h3>{item.name.replace('Manage ', '')}</h3>
                            <p>Click to manage {item.name.toLowerCase().replace('manage ', '')}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

