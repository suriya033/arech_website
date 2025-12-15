import Link from "next/link";
import styles from "./Footer.module.css";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

async function getSettings() {
    try {
        await dbConnect();
        let settings = await SiteSettings.findOne();
        if (!settings) return {};
        return settings;
    } catch (error) {
        console.warn("Failed to fetch settings:", error.message);
        return {};
    }
}

export default async function Footer() {
    const settings = await getSettings();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>Varsha and Pradeep</h3>
                        <p>Creating timeless spaces that inspire and endure.</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/services">Architectural Design</Link></li>
                            <li><Link href="/services">Interior Design</Link></li>
                            <li><Link href="/services">Urban Planning</Link></li>
                            <li><Link href="/services">Renovation</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Contact</h4>
                        <ul>
                            <li style={{ whiteSpace: 'pre-line' }}>{settings.address || "123 Architecture Ave\nDesign City, ST 12345"}</li>
                            <li>{settings.phone || "+91 98400 20792"}</li>
                            <li>{settings.email || "pradeep_vparchitects@yahoo.co.in"}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Varsha and Pradeep. All rights reserved.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                        {settings.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', transition: 'color 0.3s' }} title="Instagram">
                                📷
                            </a>
                        )}
                        {settings.whatsapp && (
                            <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', transition: 'color 0.3s' }} title="WhatsApp">
                                💬
                            </a>
                        )}
                        {settings.linkedin && (
                            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', transition: 'color 0.3s' }} title="LinkedIn">
                                💼
                            </a>
                        )}
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Link href="/admin/login" className="admin-link">Admin Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
