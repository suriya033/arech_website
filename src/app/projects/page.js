import PageHeroSlider from "@/components/PageHeroSlider";
import ProjectsGallery from "@/components/ProjectsGallery";

export const metadata = {
    title: "Projects | varsha and pradeep architects",
    description: "Explore our portfolio of residential, commercial, and interior design projects.",
};

export default function Projects() {
    return (
        <main>
            <PageHeroSlider
                title="Our Projects"
                description="A showcase of our finest work, demonstrating our commitment to excellence and innovation."
                images={[
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                ]}
            />
            <section className="section container">
                <ProjectsGallery />
            </section>
        </main>
    );
}
