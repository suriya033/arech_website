import PageHeader from "@/components/PageHeader";
import ProjectsGallery from "@/components/ProjectsGallery";

export const metadata = {
    title: "Projects | varsha and pradeep architects",
    description: "Explore our portfolio of residential, commercial, and interior design projects.",
};

export default function Projects() {
    return (
        <main>
            <PageHeader
                title="Our Projects"
                description="A showcase of our finest work, demonstrating our commitment to excellence and innovation."
            />
            <section className="section container">
                <ProjectsGallery />
            </section>
        </main>
    );
}
