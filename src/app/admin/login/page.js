"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--secondary)' }}>
            <div style={{ padding: '3rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '450px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Admin Login</h1>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Enter your credentials to access the dashboard.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Sign In</button>
                    {error && (
                        <div style={{ color: 'var(--error)', marginTop: '0.5rem', fontSize: '0.9rem', textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(220, 53, 69, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                            {error}
                        </div>
                    )}
                </form>
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)' }}>&larr; Back to Website</Link>
                </div>
            </div>
        </div>
    );
}
