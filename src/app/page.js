import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";

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
          <Link href="/about" className="btn-outline reveal">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: 'var(--background)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="reveal-blur">Our Design Process</h2>
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

      {/* Services Section */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="reveal-skew">Our Services</h2>
            <p className="reveal">Comprehensive architectural solutions for every scale.</p>
          </div>
          <div className={`${styles.servicesGrid} stagger-container`}>
            <div className={`${styles.serviceCard} tilt-3d`}>
              <div className={styles.serviceIcon}>🏛️</div>
              <h3>Architectural Design</h3>
              <p>From concept to construction, we deliver innovative design solutions that balance aesthetics with functionality.</p>
            </div>
            <div className={`${styles.serviceCard} tilt-3d`}>
              <div className={styles.serviceIcon}>🛋️</div>
              <h3>Interior Design</h3>
              <p>Creating cohesive and beautiful interiors that complement the architectural form and enhance user experience.</p>
            </div>
            <div className={`${styles.serviceCard} tilt-3d`}>
              <div className={styles.serviceIcon}>🏙️</div>
              <h3>Urban Planning</h3>
              <p>Sustainable master planning for communities and large-scale developments that prioritize connectivity and livability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section container">
        <div className={styles.projectsHeader}>
          <div>
            <h2 className="reveal-blur">Featured Projects</h2>
            <p className="reveal" style={{ marginBottom: 0 }}>Discover our latest architectural achievements.</p>
          </div>
          <Link href="/projects" className="btn-outline reveal">
            View All Projects
          </Link>
        </div>

        <div className={`${styles.projectsGrid} stagger-container`}>
          {/* Project 1 */}
          <div className={`${styles.projectCard} tilt-3d`}>
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Modern Residence"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Residential</span>
              <h3>Modern Residence</h3>
              <p className={styles.projectLocation}></p>
              <div className={styles.viewProjectBtn}>
                View Project <span />
              </div>
            </div>
          </div>
          {/* Project 2 */}
          <div className={`${styles.projectCard} tilt-3d`}>
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Corporate HQ"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Commercial</span>
              <h3>Corporate HQ</h3>
              <p className={styles.projectLocation}></p>
              <div className={styles.viewProjectBtn}>
                View Project <span />
              </div>
            </div>
          </div>
          {/* Project 3 */}
          <div className={`${styles.projectCard} tilt-3d`}>
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
              alt="Urban Loft"
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Interior</span>
              <h3>Urban Loft</h3>
              <p className={styles.projectLocation}></p>
              <div className={styles.viewProjectBtn}>
                View Project <span />
              </div>
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
