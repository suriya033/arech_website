"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "../admin.module.css";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    if (!session) return null;

    const navItems = [
        { name: "Projects", path: "/admin/projects", icon: "🏗️", desc: "Manage your architectural portfolio" },
        { name: "Services", path: "/admin/services", icon: "⚙️", desc: "Update your service offerings" },
        { name: "Team", path: "/admin/team", icon: "👥", desc: "Manage your creative team" },
        { name: "Testimonials", path: "/admin/testimonials", icon: "💬", desc: "Manage client feedback" },
        { name: "Careers", path: "/admin/careers", icon: "💼", desc: "Post new job openings" },
        { name: "Messages", path: "/admin/messages", icon: "📬", desc: "View client inquiries" },
        { name: "Settings", path: "/admin/settings", icon: "🛠️", desc: "Update site-wide settings" },
    ];

    return (
        <div className={styles.container}>
            <AdminSidebar />

            <main className={styles.main}>
                <div className={styles.header}>
                    <div>
                        <h1>Welcome back, {session?.user?.email?.split('@')[0]}</h1>
                        <p>Here's an overview of your website management tools.</p>
                    </div>
                </div>

                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Active Session</span>
                        <span className={styles.statValue}>Admin</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Last Login</span>
                        <span className={styles.statValue}>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <div className={styles.projectGrid}>
                    {navItems.map((item) => (
                        <Link href={item.path} key={item.path} className={styles.card}>
                            <div className={styles.cardIcon}>{item.icon}</div>
                            <h3>{item.name}</h3>
                            <p>{item.desc}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
