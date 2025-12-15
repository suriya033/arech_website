import PageHeader from "@/components/PageHeader";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export const metadata = {
    title: "Services | Varsha and Pradeep",
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
            <PageHeader
                title="Our Services"
                description="We offer a full range of architectural and design services to bring your vision to life."
            />

            <section className="section container">
                {services.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {services.map((service) => (
                            <div key={service._id} style={{
                                padding: '2rem',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                transition: 'transform 0.3s ease',
                                backgroundColor: 'var(--background)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon || "🛠️"}</div>
                                <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center' }}>No services listed yet.</p>
                )}
            </section>

            <section className="section container" style={{ textAlign: 'center', backgroundColor: 'var(--secondary)', padding: '4rem 2rem', borderRadius: '16px', marginTop: '2rem' }}>
                <h2>How We Work</h2>
                <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
                    Our process is collaborative and transparent. We work closely with you at every stage to ensure your complete satisfaction.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                    {['Consultation', 'Concept Design', 'Development', 'Execution', 'Handover'].map((step, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--foreground)',
                                color: 'var(--background)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                {i + 1}
                            </div>
                            <span style={{ fontWeight: '500' }}>{step}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
