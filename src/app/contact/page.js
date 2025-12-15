import PageHeader from "@/components/PageHeader";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Contact Us | Varsha and Pradeep",
    description: "Get in touch with us to discuss your next project.",
};

async function getSettings() {
    await dbConnect();
    let settings = await SiteSettings.findOne();
    if (!settings) return {};
    return settings;
}

export default async function Contact() {
    const settings = await getSettings();

    return (
        <main>
            <PageHeader
                title="Contact Us"
                description="We'd love to hear from you. Let's build something amazing together."
            />

            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div>
                        <h2>Get in Touch</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            Have a project in mind? Fill out the form or contact us directly.
                        </p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Office</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{settings.address || "123 Architecture Ave\nDesign City, ST 12345"}</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact</h3>
                            <p>
                                Phone: {settings.phone || "+91 98400 20792"}<br />
                                Email: {settings.email || "pradeep_vparchitects@yahoo.co.in"}
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hours</h3>
                            <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </section>

            {/* Map Section */}
            <section style={{ height: '450px', width: '100%', backgroundColor: '#eee' }}>
                {settings.googleMapUrl ? (
                    <iframe
                        src={settings.googleMapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontSize: '1.5rem' }}>
                        Map location not set in admin settings.
                    </div>
                )}
            </section>
        </main>
    );
}
