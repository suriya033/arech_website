import PageHeader from "@/components/PageHeader";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
    await dbConnect();
    const { id } = await params;
    const member = await TeamMember.findById(id);
    if (!member) return { title: "Member Not Found" };
    return {
        title: `${member.name} | Varsha and Pradeep`,
        description: member.role,
    };
}

async function getMember(id) {
    await dbConnect();
    const member = await TeamMember.findById(id);
    if (!member) return null;
    return member;
}

export default async function MemberDetails({ params }) {
    const { id } = await params;
    const member = await getMember(id);

    if (!member) {
        notFound();
    }

    return (
        <main>
            <PageHeader
                title={member.name}
                description={member.role}
            />

            <section className="section container">
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/about" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.3s'
                    }} className="hover-accent">
                        ← Back to Team
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Image Column */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <img
                                src={member.image}
                                alt={member.name}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                        {/* Decorative element */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '-20px',
                            right: '20px',
                            bottom: '-20px',
                            border: '2px solid var(--accent)',
                            borderRadius: '16px',
                            zIndex: 0,
                            opacity: 0.3
                        }}></div>
                    </div>

                    {/* Content Column */}
                    <div>
                        <h2 style={{
                            marginBottom: '1.5rem',
                            fontSize: '2rem',
                            borderBottom: '2px solid var(--accent)',
                            display: 'inline-block',
                            paddingBottom: '0.5rem'
                        }}>
                            Biography
                        </h2>
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            whiteSpace: 'pre-wrap',
                            marginBottom: '3rem',
                            color: 'var(--foreground)',
                            opacity: 0.9
                        }}>
                            {member.description || "No description available."}
                        </div>

                        {(member.email || member.phone) && (
                            <div style={{
                                padding: '2.5rem',
                                backgroundColor: 'var(--background)',
                                borderRadius: '16px',
                                border: '1px solid var(--border)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                            }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Get in Touch</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {member.email && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem'
                                            }}>📧</div>
                                            <div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email</div>
                                                <a href={`mailto:${member.email}`} style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>{member.email}</a>
                                            </div>
                                        </div>
                                    )}
                                    {member.phone && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem'
                                            }}>📞</div>
                                            <div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone</div>
                                                <a href={`tel:${member.phone}`} style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>{member.phone}</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
