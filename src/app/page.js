import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import TeamListClient from "@/components/Team/TeamListClient";

export default function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroSlider />
        <div className={styles.heroContent}>
          <h1 className="reveal-blur">Designing Spaces That Inspire</h1>
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
          <h2 className="reveal-skew">Welcome to varsha and pradeep architects</h2>
          <p className="reveal">
            &ldquo;Our corporate office in Chennai stands testimony to your ability to convert our abstract ideas on transparency, space, elegance, simplicity, innovation, contemporariness, and green into something graceful, functional, and different.&rdquo;
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: 'var(--background)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="reveal-blur" style={{textDecoration:'underline',textDecorationColor:'#ffd700'}}>Our Design Process</h2>
            <p className="reveal">A systematic approach to bringing your vision to life.</p>
          </div>
          <div className={styles.processGrid}>
            <div className={`${styles.processStep} reveal tilt-3d`}>
              <div className={styles.stepNumber}>01</div>
              <h3>Discovery</h3>
              <p>We begin by understanding your needs, site context, and aspirations through deep consultation.</p>
            </div>
            <div className={`${styles.processStep} reveal tilt-3d`} style={{ transitionDelay: '0.2s' }}>
              <div className={styles.stepNumber}>02</div>
              <h3>Concept</h3>
              <p>Translating ideas into sketches and 3D models to explore spatial possibilities and aesthetics.</p>
            </div>
            <div className={`${styles.processStep} reveal tilt-3d`} style={{ transitionDelay: '0.4s' }}>
              <div className={styles.stepNumber}>03</div>
              <h3>Development</h3>
              <p>Refining the chosen concept with technical precision, material selection, and structural integrity.</p>
            </div>
            <div className={`${styles.processStep} reveal tilt-3d`} style={{ transitionDelay: '0.6s' }}>
              <div className={styles.stepNumber}>04</div>
              <h3>Execution</h3>
              <p>Overseeing the construction process to ensure every detail aligns with the architectural vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section container" style={{backgroundColor:'black'}}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="reveal-blur" style={{color:'white',textDecoration:'underline',textDecorationColor:'#ffd700'}}>Meet the Team</h2>
          <p className="reveal"style={{color:'whitesmoke'}}>The creative minds behind our exceptional designs.</p>
        </div>
        <TeamListClient />
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
          <h2 className="reveal-blur">Ready to Start Your Project?</h2>
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
