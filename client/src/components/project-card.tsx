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
  console.log("ProjectCard color:", color);

  return (
    <div
      className={`relative bg-${color}-400 rounded-lg shadow-lg cursor-pointer`}
      onClick={() => router.push("/" + id)}
    >
      <div className="pt-[100%]"></div> {/* This div ensures the 1:1 ratio */}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg">
        <Badge color={color} label={id}/>
      </div>
    </div>
  );
};

export default ProjectCard;
