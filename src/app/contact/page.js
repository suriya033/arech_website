import PageHeroSlider from "@/components/PageHeroSlider";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Contact.module.css";

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
            <ScrollReveal />
            <PageHeroSlider
                title="Contact Us"
                description="We'd love to hear from you. Let's build something amazing together."
                images={[
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                ]}
            />

            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <div className="reveal">
                            <div className={styles.infoContent}>
                                <h2>Get in Touch</h2>
                                <p className={styles.lead}>
                                    Have a project in mind? Fill out the form or contact us directly. We're here to help you bring your vision to life.
                                </p>

                                <div className={styles.infoGrid}>
                                    <div className={styles.infoCard}>
                                        <h3>📍 Office Address</h3>
                                        <p>
                                            {settings.address || "1/427, KCG College Road, Karapakkam, Chennai - 600097"}
                                        </p>
                                    </div>

                                    <div className={styles.infoCard}>
                                        <h3>📞 Contact Details</h3>
                                        <p>
                                            Phone: {settings.phone || "+91 98400 20792"}<br />
                                            Email: {settings.email || "pradeep_vparchitects@yahoo.co.in"}
                                        </p>
                                    </div>

                                    <div className={styles.infoCard}>
                                        <h3>⏰ Business Hours</h3>
                                        <p>
                                            Mon - Fri: 9:00 AM - 6:00 PM<br />
                                            Sat - Sun: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="reveal">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                <div className="container">
                    <div className={`${styles.mapContainer} reveal`}>
                        <MapEmbed googleMapUrl={settings.googleMapUrl} />
                    </div>
                </div>
            </section>
        </main>
    );
}


