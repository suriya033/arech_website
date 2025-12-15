"use client";

import { useState, useEffect } from "react";
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
                            <img src={project.image} alt={project.title} className={styles.image} />
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
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem'
                    }}
                    onClick={closeProject}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '1000px',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeProject}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '2rem',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>

                        {/* Image Slider */}
                        <div style={{ position: 'relative', width: '100%', height: '60vh', marginBottom: '1rem' }}>
                            <img
                                src={getProjectImages(selectedProject)[currentImageIndex]}
                                alt={selectedProject.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />

                            {getProjectImages(selectedProject).length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        style={{
                                            position: 'absolute',
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.2)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            cursor: 'pointer',
                                            fontSize: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.2)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            cursor: 'pointer',
                                            fontSize: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Project Details */}
                        <div style={{ color: 'white', textAlign: 'center', maxWidth: '800px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selectedProject.title}</h2>
                            <p style={{ color: '#ccc', marginBottom: '1rem' }}>{selectedProject.location} • {selectedProject.category}</p>
                            <p style={{ lineHeight: '1.6' }}>{selectedProject.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
