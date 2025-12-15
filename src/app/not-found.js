import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>Could not find requested resource</p>
            <Link href="/" className="btn">
                Return Home
            </Link>
        </div>
    )
}
