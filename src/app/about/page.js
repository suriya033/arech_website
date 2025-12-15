import PageHeroSlider from "@/components/PageHeroSlider";
import Image from "next/image";
import TeamListClient from "./TeamListClient";

export const metadata = {
    title: "About Us | varsha and pradeep architects",
    description: "Learn about our firm, our philosophy, and the team behind our award-winning designs.",
};

export default function About() {
    return (
        <main>
            <PageHeroSlider
                title="About varsha and pradeep architects"
                description="We are a team of visionaries dedicated to shaping the future of architecture."
                images={[
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                ]}
            />

            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Our Story</h2>
                        <p>
                            varsha and pradeep architects Architects, founded in 1997, began as a small practice operating from a living room and has grown into a leading architectural firm known for innovative, sustainable design. Our office, designed and built by us, was inaugurated in February 2010.</p><p>
                            We believe every project is an opportunity to create functional, beautiful, and enduring environments. Our approach is deeply collaborative—clients are partners, not just commissions. Many of our relationships continue well beyond project completion.
                        </p>
                        <p>
                            Begin your journey with us by getting in touch to schedule a meeting or call.</p><p>

                            Through our contact page, you can set up a meeting or a call at your earliest convenience.onments that are functional, beautiful, and enduring.
                        </p>
                    </div>
                    <div style={{ position: 'relative', height: '400px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
                            alt="Our Studio"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </div>
                </div>
            </section>

            <section className="section container" style={{ backgroundColor: 'var(--secondary)', padding: '4rem 2rem', borderRadius: '16px' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2>Our Philosophy</h2>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--foreground)' }}>
                        "Architecture should speak of its time and place, but yearn for timelessness."
                    </p>
                    <p>
                        We approach every project with a fresh perspective, combining traditional craftsmanship with modern technology. Our designs are rooted in context, sustainability, and human experience.
                    </p>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Meet the Team</h2>
                <TeamListClient />
            </section>
        </main>
    );
}
