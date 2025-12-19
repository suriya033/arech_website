import PageHeroSlider from "@/components/PageHeroSlider";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./services.module.css";

export const metadata = {
    title: "Services | varsha and pradeep architects",
    description: "Comprehensive architectural and design services tailored to your needs.",
};


async function getServices() {
    try {
        await dbConnect();
        return await Service.find({}).sort({ createdAt: -1 });
    } catch (error) {
        console.warn("Failed to fetch services:", error.message);
        return [];
    }
}

export default async function Services() {
    const services = await getServices();

    return (
        <main>
            <ScrollReveal />
            <PageHeroSlider
                title="Our Services"
                description="We offer a full range of architectural and design services to bring your vision to life through innovation and excellence."
                images={[
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                ]}
            />

            <section className={`${styles.servicesSection} container`}>
                {services.length > 0 ? (
                    <div className={styles.grid}>
                        {services.map((service) => (
                            <div key={service._id} className={`${styles.card} reveal`}>
                                <div className={styles.iconContainer}>
                                    {service.icon || "🛠️"}
                                </div>
                                <h3 className={styles.title}>{service.title}</h3>
                                <p className={styles.description}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-muted)' }}>No services listed yet.</p>
                )}
            </section>

            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.processHeader}>
                        <h2 className="reveal">How We Work</h2>
                        <p className="reveal">
                            Our process is collaborative and transparent, ensuring every detail aligns with your vision.
                        </p>
                    </div>

                    <div className={styles.processGrid}>
                        {['Consultation', 'Concept Design', 'Development', 'Execution', 'Handover'].map((step, i) => (
                            <div key={i} className={`${styles.processStep} reveal`}>
                                <div className={styles.stepNumber}>
                                    {i + 1}
                                </div>
                                <h4 className={styles.stepTitle}>{step}</h4>
                                <p className={styles.stepDescription}>
                                    {i === 0 && "Initial meeting to understand your vision and requirements."}
                                    {i === 1 && "Developing the core architectural concepts and sketches."}
                                    {i === 2 && "Refining designs and preparing technical documentation."}
                                    {i === 3 && "Overseeing construction and ensuring quality standards."}
                                    {i === 4 && "Final inspection and delivering your completed project."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
