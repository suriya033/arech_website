import PageHeroSlider from "@/components/PageHeroSlider";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import ExpertiseSlider from "@/components/ExpertiseSlider";
import ProcessSlider from "@/components/ProcessSlider";
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
            <PageHeroSlider
                title="Our Services"
                description="We offer a full range of architectural and design services to bring your vision to life through innovation and excellence."
                images={[
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                ]}
            />

            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className="reveal-blur">Our Expertise</h2>
                        <p className="reveal">
                            We combine artistic vision with technical precision to deliver architectural solutions that transcend expectations.
                        </p>
                    </div>

                    <div className="reveal">
                        {services.length > 0 ? (
                            <ExpertiseSlider services={JSON.parse(JSON.stringify(services))} />
                        ) : (
                            <div className={styles.noData}>
                                <p>Our expertise is currently being updated. Please check back soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.processHeader}>
                        <h2 className="reveal-skew">How We Work</h2>
                        <p className="reveal">
                            Our process is collaborative and transparent, ensuring every detail aligns with your vision.
                        </p>
                    </div>

                    <div className="reveal">
                        <ProcessSlider />
                    </div>
                </div>
            </section>
        </main>
    );
}
