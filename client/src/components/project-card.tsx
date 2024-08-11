"use client";

import Badge from "@/components/badge";
import { useRouter } from "next/navigation";
import React from "react";

interface ProjectCardProps {
  id: string;
  color: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, color }) => {
  const router = useRouter();

  return (
    <div
      className={`bg-${color}-400 p-4 rounded-lg shadow-lg`}
      onClick={() => router.push("/project/" + id)}
    >
      <Badge />
    </div>
  );
};

export default ProjectCard;
