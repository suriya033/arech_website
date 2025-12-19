import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./MemberProfile.module.css";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateMetadata({ params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const member = await TeamMember.findById(id);
        if (!member) return { title: "Member Not Found" };
        return {
            title: `${member.name} | varsha and pradeep architects`,
            description: member.role,
        };
    } catch (error) {
        return { title: "Error" };
    }
}

async function getMember(id) {
    try {
        await dbConnect();
        const member = await TeamMember.findById(id);
        if (!member) return null;
        return member;
    } catch (error) {
        console.warn("Failed to fetch member:", error.message);
        return null;
    }
}

export default async function MemberDetails({ params }) {
    const { id } = await params;
    const member = await getMember(id);

    if (!member) {
        notFound();
    }

    return (
        <main className={styles.profileContainer}>
            <ScrollReveal />
            <div className="container">
                <Link href="/about" className={styles.backLink}>
                    ← Back to Team
                </Link>

                <div className={styles.grid}>
                    {/* Image Column */}
                    <div className={`${styles.imageWrapper} reveal-left`}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority
                            />
                        </div>
                        <div className={styles.imageDecoration}></div>
                    </div>

                    {/* Content Column */}
                    <div className="reveal-right">
                        <h1 className={styles.name}>{member.name}</h1>
                        <div className={styles.role}>{member.role}</div>

                        <h2 className={styles.sectionTitle}>Biography</h2>
                        <div className={styles.bio}>
                            {member.description || "No description available."}
                        </div>

                        {(member.email || member.phone) && (
                            <div className={`${styles.contactCard} scale-in`}>
                                <h3 className={styles.contactTitle}>Contact Information</h3>
                                <div className={styles.contactList}>
                                    {member.email && (
                                        <div className={styles.contactItem}>
                                            <div className={styles.iconBox}>✉️</div>
                                            <div>
                                                <div className={styles.contactLabel}>Email</div>
                                                <a href={`mailto:${member.email}`} className={styles.contactValue}>
                                                    {member.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {member.phone && (
                                        <div className={styles.contactItem}>
                                            <div className={styles.iconBox}>📞</div>
                                            <div>
                                                <div className={styles.contactLabel}>Phone</div>
                                                <a href={`tel:${member.phone}`} className={styles.contactValue}>
                                                    {member.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
