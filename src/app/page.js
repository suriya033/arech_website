import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroSlider />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Designing Spaces That Inspire</h1>
          <p>
            We create modern, sustainable, and timeless architectural designs tailored to your vision.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/projects" className="btn">
              View Our Work
            </Link>
            <Link href="/contact" className="btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container">
        <div className={styles.intro}>
          <h2>Welcome to Varsha and Pradeep</h2>
          <p>“Our corporate office in Chennai stands testimony to your ability to convert our abstract ideas on transparency, space, elegance, simplicity, innovation, contemporariness, and green into something graceful, functional, and different.”
          </p>
          <Link href="/about" className="btn-outline">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section container" style={{ backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Our Services</h2>
          <p>Comprehensive architectural solutions for every scale.</p>
        </div>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Architectural Design</h3>
            <p>From concept to construction, we deliver innovative design solutions that balance aesthetics with functionality.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Interior Design</h3>
            <p>Creating cohesive and beautiful interiors that complement the architectural form and enhance user experience.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Urban Planning</h3>
            <p>Sustainable master planning for communities and large-scale developments that prioritize connectivity and livability.</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
          <div>
            <h2>Featured Projects</h2>
            <p style={{ marginBottom: 0 }}>PROJECTS.</p>
          </div>
          <Link href="/projects" className={`btn-outline ${styles.viewAllBtn}`}>
            View All
          </Link>
        </div>
        <div className={styles.projectsGrid}>
          {/* Project 1 */}
          <div className={styles.projectCard}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Modern Residence"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <h3>Modern Residence</h3>
              <p>Residential</p>
            </div>
          </div>
          {/* Project 2 */}
          <div className={styles.projectCard}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Corporate HQ"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <h3>Corporate HQ</h3>
              <p>Commercial</p>
            </div>
          </div>
          {/* Project 3 */}
          <div className={styles.projectCard}>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
              alt="Urban Loft"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <h3>Urban Loft</h3>
              <p>Interior</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/projects" className="btn-outline">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>Let's discuss your vision and how we can bring it to life. Schedule a consultation with our expert team today.</p>
          <Link href="/contact" className="btn">
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
