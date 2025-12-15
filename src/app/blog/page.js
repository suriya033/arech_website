import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export const metadata = {
    title: "Blog | Varsha and Pradeep",
    description: "Insights, trends, and news from the world of architecture and design.",
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
            <PageHeader
                title="Our Blog"
                description="Thoughts on architecture, design, and living well."
            />

            <section className="section container">
                {posts.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {posts.map(post => (
                            <article key={post._id} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease', backgroundColor: 'var(--background)' }}>
                                {post.image && (
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{post.title}</h3>
                                    <p style={{ marginBottom: '1.5rem' }}>{post.excerpt}</p>
                                    <Link href={`/blog/${post._id}`} style={{ color: 'var(--accent)', fontWeight: '500' }}>Read More →</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center' }}>No blog posts found.</p>
                )}
            </section>
        </main>
    );
}
