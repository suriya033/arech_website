import Image from "next/image";
import PageHeroSlider from "@/components/PageHeroSlider";
import TeamListClient from "./TeamListClient";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./About.module.css";

export const metadata = {
    title: "About Us | varsha and pradeep architects",
    description: "Learn about our firm, our philosophy, and the team behind our award-winning designs.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function About() {
    return (
        <main>
            <ScrollReveal />
            <PageHeroSlider
                title="About Us"
                description="We are a team of visionaries dedicated to shaping the future of architecture through innovation and timeless design."
                images={[
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                ]}
            />

            <section className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div className="reveal-left">
                            <div className={styles.storyContent}>
                                <h2>Our Story</h2>
                                <p className={styles.lead}>
                                    varsha and pradeep architects, founded in 1997, began as a small practice operating from a living room and has grown into a leading architectural firm known for innovative, sustainable design.
                                </p>
                                <p>
                                    We believe every project is an opportunity to create functional, beautiful, and enduring environments. Our approach is deeply collaborative—clients are partners, not just commissions. Many of our relationships continue well beyond project completion.
                                </p>
                                <p>
                                    Through our contact page, you can set up a meeting or a call at your earliest convenience. Let&apos;s create environments that are functional, beautiful, and enduring.
                                </p>
                            </div>
                        </div>
                        <div className="reveal-right">
                            <div className={styles.storyImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
                                    alt="Our Studio"
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.philosophySection}>
                <div className="container">
                    <div className="scale-in">
                        <div className={styles.philosophyContent}>
                            <h2>Our Philosophy</h2>
                            <div className={styles.philosophyCard}>
                                <p className={styles.quote}>
                                    "Architecture should speak of its time and place, but yearn for timelessness."
                                </p>
                                <p className={styles.philosophyText}>
                                    We approach every project with a fresh perspective, combining traditional craftsmanship with modern technology. Our designs are rooted in context, sustainability, and human experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.teamHeader}>
                        <h2 className="reveal">Meet the Team</h2>
                        <p className="reveal">The creative minds behind our exceptional designs.</p>
                    </div>
                    <div className="reveal">
                        <TeamListClient />
                    </div>
                </div>
            </section>
        </main>
    );
}
