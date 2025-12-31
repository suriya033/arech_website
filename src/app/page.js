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
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`${styles.heroSubtitle} reveal-blur`}>Architecture & Interior Design</span>
            <h1 className="reveal-skew" style={{fontSize:'55px'}}>Designing Spaces <br />That Inspire</h1>
            <p className="reveal">
              We create modern, sustainable, and timeless architectural designs tailored to your unique vision.
            </p>
            <div className={`${styles.heroButtons} reveal`}>
              <Link href="/projects" className="btn">
                View Our Work
              </Link>
              <Link href="/contact" className="btn-outline">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className={`${styles.introSection} section`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={`${styles.introText} reveal-left`}>
              <span className={styles.sectionLabel}>About Us</span>
              <h2 className={styles.introHeading}>Welcome to Varsha and Pradeep Architects</h2>
              <div className={styles.introDivider}></div>
            </div>
            <div className={`${styles.introQuote} reveal-right`}>
              <p>
                {"“"}Our corporate office in Chennai stands testimony to your ability to convert our abstract ideas on transparency, space, elegance, simplicity, innovation, contemporariness, and green into something graceful, functional, and different.{"”"}
              </p>
              <cite className={styles.quoteAuthor}>— Corporate Client, Chennai</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`${styles.processSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Methodology</span>
            <h2 className="reveal-blur">Our Design Process</h2>
            <p className="reveal">A systematic approach to bringing your vision to life.</p>
          </div>

          <div className={styles.processGrid}>
            <div className={`${styles.processStep} reveal`}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>01</span>
                <h3>Discovery</h3>
              </div>
              <p>We begin by understanding your needs, site context, and aspirations through deep consultation.</p>
            </div>
            <div className={`${styles.processStep} reveal`} style={{ transitionDelay: '0.2s' }}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>02</span>
                <h3>Concept</h3>
              </div>
              <p>Translating ideas into sketches and 3D models to explore spatial possibilities and aesthetics.</p>
            </div>
            <div className={`${styles.processStep} reveal`} style={{ transitionDelay: '0.4s' }}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>03</span>
                <h3>Development</h3>
              </div>
              <p>Refining the chosen concept with technical precision, material selection, and structural integrity.</p>
            </div>
            <div className={`${styles.processStep} reveal`} style={{ transitionDelay: '0.6s' }}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>04</span>
                <h3>Execution</h3>
              </div>
              <p>Overseeing the construction process to ensure every detail aligns with the architectural vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section container" style={{ backgroundColor: 'black' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="reveal-blur" style={{ color: 'white', textDecoration: 'underline', textDecorationColor: '#ffd700' }}>Meet the Team</h2>
          <p className="reveal" style={{ color: 'whitesmoke' }}>The creative minds behind our exceptional designs.</p>
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
