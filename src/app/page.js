import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal />

      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroSlider />
        <div className={styles.heroContent}>
          <h1 className="reveal">Designing Spaces That Inspire</h1>
          <p className="reveal">
            We create modern, sustainable, and timeless architectural designs tailored to your vision.
          </p>
          <div className={`${styles.heroButtons} reveal`}>
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
          <h2 className="reveal">Welcome to varsha and pradeep architects</h2>
          <p className="reveal">
            &ldquo;Our corporate office in Chennai stands testimony to your ability to convert our abstract ideas on transparency, space, elegance, simplicity, innovation, contemporariness, and green into something graceful, functional, and different.&rdquo;
          </p>
          <Link href="/about" className="btn-outline reveal">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="reveal">Our Services</h2>
            <p className="reveal">Comprehensive architectural solutions for every scale.</p>
          </div>
          <div className={`${styles.servicesGrid} stagger-container`}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🏛️</div>
              <h3>Architectural Design</h3>
              <p>From concept to construction, we deliver innovative design solutions that balance aesthetics with functionality.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🛋️</div>
              <h3>Interior Design</h3>
              <p>Creating cohesive and beautiful interiors that complement the architectural form and enhance user experience.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🏙️</div>
              <h3>Urban Planning</h3>
              <p>Sustainable master planning for communities and large-scale developments that prioritize connectivity and livability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className={styles.projectsHeader}>
          <div>
            <h2 className="reveal-left" style={{ textAlign: 'center' }}>Featured Projects</h2>
            <p className="reveal-left" style={{ marginBottom: 0 }}>Discover our latest architectural achievements.</p>
          </div>
          <Link href="/projects" className="btn-outline reveal-right">
            View All Projects
          </Link>
        </div>

        <div className={`${styles.projectsGrid} stagger-container`}>
          {/* Project 1 */}
          <div className={styles.projectCard}>
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Modern Residence"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <p>Residential</p>
              <h3>Modern Residence</h3>
            </div>
          </div>
          {/* Project 2 */}
          <div className={styles.projectCard}>
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Corporate HQ"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <p>Commercial</p>
              <h3>Corporate HQ</h3>
            </div>
          </div>
          {/* Project 3 */}
          <div className={styles.projectCard}>
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
              alt="Urban Loft"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <p>Interior</p>
              <h3>Urban Loft</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="reveal">
        <StatsSection />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="reveal">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className="reveal">Ready to Start Your Project?</h2>
          <p className="reveal">Let's discuss your vision and how we can bring it to life. Schedule a consultation with our expert team today.</p>
          <div className="reveal">
            <Link href="/contact" className="btn">
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


