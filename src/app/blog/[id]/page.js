import PageHeader from "@/components/PageHeader";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const post = await Blog.findById(id);
        if (!post) return { title: "Post Not Found" };
        return {
            title: `${post.title} | varsha and pradeep architects`,
            description: post.excerpt,
        };
    } catch (error) {
        return { title: "Error" };
    }
}

async function getPost(id) {
    try {
        await dbConnect();
        const post = await Blog.findById(id);
        if (!post) return null;
        return post;
    } catch (error) {
        console.warn("Failed to fetch post:", error.message);
        return null;
    }
}

export default async function BlogPost({ params }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <PageHeader
                title={post.title}
                description={new Date(post.createdAt).toLocaleDateString()}
            />

            <article className="section container" style={{ maxWidth: '800px' }}>
                {post.image && (
                    <div style={{ marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                )}

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </div>

                {post.author && (
                    <div style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        Written by {post.author}
                    </div>
                )}
            </article>
        </main>
    );
}
