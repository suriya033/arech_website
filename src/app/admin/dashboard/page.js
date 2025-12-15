"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#2d2d2d', color: '#fff', padding: '2rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Admin Panel</h2>
                <nav>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><Link href="/admin/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
                        <li><Link href="/admin/team" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Team</Link></li>
                        <li><Link href="/admin/projects" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Projects</Link></li>
                        <li><Link href="/admin/services" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Services</Link></li>
                        <li><Link href="/admin/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Blog</Link></li>
                        <li><Link href="/admin/testimonials" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Testimonials</Link></li>
                        <li><Link href="/admin/careers" style={{ color: '#ccc', textDecoration: 'none' }}>Manage Careers</Link></li>
                        <li><Link href="/admin/messages" style={{ color: '#ccc', textDecoration: 'none' }}>Messages</Link></li>
                        <li><Link href="/admin/settings" style={{ color: '#ccc', textDecoration: 'none' }}>Site Settings</Link></li>
                    </ul>
                </nav>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    style={{ marginTop: 'auto', padding: '0.5rem 1rem', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', cursor: 'pointer', borderRadius: '4px', width: '100%', marginTop: '2rem' }}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f9f9f9' }}>
                <h1>Welcome, {session?.user?.email}</h1>
                <p style={{ marginBottom: '2rem' }}>Manage your website content from the options below.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <Link href="/admin/team" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Team</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage team members</p>
                    </Link>

                    <Link href="/admin/projects" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Projects</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage projects</p>
                    </Link>

                    <Link href="/admin/services" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Services</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage services</p>
                    </Link>

                    <Link href="/admin/careers" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Careers</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage applications</p>
                    </Link>

                    <Link href="/admin/blog" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Blog</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage blog posts</p>
                    </Link>

                    <Link href="/admin/testimonials" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Testimonials</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage client reviews</p>
                    </Link>

                    <Link href="/admin/settings" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Settings</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Contact info & Socials</p>
                    </Link>

                    <Link href="/admin/messages" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📬</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Messages</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>View contact messages</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
