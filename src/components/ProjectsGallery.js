"use client";

import { useState, useEffect } from "react";
import styles from "./ProjectsGallery.module.css";

const categories = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectsGallery() {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

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
                    <div key={project._id} className={styles.card}>
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
        </div>
    );
}
