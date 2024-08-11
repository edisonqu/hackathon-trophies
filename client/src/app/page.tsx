import Image from "next/image";
import ProjectCard from "@/components/project-card";

const projects = [
  {
    id: "project-1",
    imageurl: "/project-1.jpg",
    color: "green",
  },
  {
    id: "project-2",
    imageurl: "/project-2.jpg",
    color: "rose",
  },
  {
    id: "project-3",
    imageurl: "/project-3.jpg",
    color: "green",
  },
  {
    id: "project-4",
    imageurl: "/project-4.jpg",
    color: "purple",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-cream">
      <div className="z-10 w-full max-w-8xl items-center justify-between font-mono text-sm lg:flex flex-col">
        <div className="py-24">
          <h1 className="text-4xl font-bold">trophies.xyz</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              color={project.color}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
