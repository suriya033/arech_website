import Image from "next/image";
import PageHeroSlider from "@/components/PageHeroSlider";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export const metadata = {
    title: "Blog | varsha and pradeep architects",
    description: "Insights, trends, and news from the world of architecture and design.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

async function getPosts() {
    try {
        await dbConnect();
        return await Blog.find({}).sort({ createdAt: -1 });
    } catch (error) {
        console.warn("Failed to fetch posts:", error.message);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main>
            <PageHeroSlider
                title="Our Blog"
                description="Thoughts on architecture, design, and living well."
                images={[
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
                ]}
            />

            <section className="section container">
                {posts.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                        {posts.map(post => (
                            <article key={post._id} className="blog-card" style={{
                                border: '1px solid rgba(0,0,0,0.05)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'all 0.4s ease',
                                backgroundColor: '#fff',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {post.image && (
                                    <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                            className="blog-image"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#666',
                                        marginBottom: '1rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: '600'
                                    }}>
                                        {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: '1.3', fontWeight: 'bold', color: '#111' }}>
                                        <Link href={`/blog/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p style={{ marginBottom: '2rem', color: '#555', lineHeight: '1.6', flex: 1 }}>{post.excerpt}</p>
                                    <Link href={`/blog/${post._id}`} style={{
                                        color: '#111',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Read Article <span style={{ transition: 'transform 0.2s' }}>→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                        <p style={{ fontSize: '1.2rem' }}>No blog posts found yet.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
