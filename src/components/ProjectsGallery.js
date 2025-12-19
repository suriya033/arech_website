"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProjectsGallery.module.css";

const categories = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectsGallery() {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            if (data.length === 0) throw new Error("No data");
            setProjects(data);
        } catch (error) {
            console.log("Error fetching projects:", error.message);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    if (loading) return <p>Loading projects...</p>;



    const openProject = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = getProjectImages(selectedProject);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = getProjectImages(selectedProject);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getProjectImages = (project) => {
        let imgs = [];
        if (project.image) imgs.push(project.image);
        if (project.images && project.images.length > 0) {
            imgs = [...imgs, ...project.images.filter(img => img !== project.image)];
        }
        return imgs.length > 0 ? imgs : ['/placeholder.jpg'];
    };

    return (
        <div>
            <div className={styles.filterContainer}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredProjects.map(project => (
                    <div
                        key={project._id}
                        className={styles.card}
                        onClick={() => openProject(project)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className={styles.content}>
                            <span className={styles.category}>{project.category}</span>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.location}>{project.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className={styles.modalOverlay} onClick={closeProject}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button onClick={closeProject} className={styles.closeBtn}>
                            ×
                        </button>

                        {/* Image Slider */}
                        <div className={styles.sliderContainer}>
                            <Image
                                src={getProjectImages(selectedProject)[currentImageIndex]}
                                alt={selectedProject.title}
                                fill
                                className={styles.sliderImage}
                                sizes="100vw"
                                priority
                            />

                            {getProjectImages(selectedProject).length > 1 && (
                                <>
                                    <button onClick={prevImage} className={`${styles.navBtn} ${styles.prevBtn}`}>
                                        ‹
                                    </button>
                                    <button onClick={nextImage} className={`${styles.navBtn} ${styles.nextBtn}`}>
                                        ›
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Project Details */}
                        <div className={styles.projectDetails}>
                            <h2 className={styles.projectTitle}>{selectedProject.title}</h2>
                            <p className={styles.projectMeta}>{selectedProject.location} • {selectedProject.category}</p>
                            <p className={styles.projectDesc}>{selectedProject.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
