import PageHeroSlider from "@/components/PageHeroSlider";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";

export const metadata = {
    title: "Contact Us | varsha and pradeep architects",
    description: "Get in touch with us to discuss your next project.",
};

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

export default async function Contact() {
    const settings = await getSettings();

    return (
        <main>
            <PageHeroSlider
                title="Contact Us"
                description="We'd love to hear from you. Let's build something amazing together."
                images={[
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                ]}
            />

            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Get in Touch</h2>
                        <p style={{ marginBottom: '3rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            Have a project in mind? Fill out the form or contact us directly.
                        </p>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>Office</h3>
                            <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{settings.address || "123 Architecture Ave\nDesign City, ST 12345"}</p>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>Contact</h3>
                            <p style={{ lineHeight: '1.8' }}>
                                <span style={{ display: 'block' }}>Phone: {settings.phone || "+91 98400 20792"}</span>
                                <span style={{ display: 'block' }}>Email: {settings.email || "pradeep_vparchitects@yahoo.co.in"}</span>
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>Hours</h3>
                            <p style={{ lineHeight: '1.6' }}>
                                Mon - Fri: 9:00 AM - 6:00 PM<br />
                                Sat - Sun: Closed
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </section>

            {/* Map Section */}
            <section style={{
                height: '500px',
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
            }}>
                <MapEmbed googleMapUrl={settings.googleMapUrl} />
            </section>
        </main>
    );
}
