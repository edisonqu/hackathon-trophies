"use client";
import ProjectCard from "@/components/project-card";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/router";

const user = {
  bio: "rule the world",
  hackathons: [
    "qhacks-2024",
    "deltahacks-x",
    "ai-agents-hackathon",
    "jamhacks-7",
    "hackville2023",
    "machacks-3",
    "qhacks-2023",
    "uofthacks-x",
    "agent-hacker-2",
    "onerecord-yyz",
    "hack-the-valley-7",
    "the-goldenhack-4",
    "ignition-hacks-2022",
    "hackthe6ix2022",
    "hackwithacrew",
    "onehacksii",
    "hackbytes",
    "coastal-hacks",
    "jamhacks6",
    "ignition-hacks-2021",
  ],
  header: {
    color: "#000000",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/user_stylesheet_background_images/002/185/350/datas/full_width.jpeg",
  },
  image:
    "https://d112y698adiu2z.cloudfront.net/photos/production/user_photos/002/572/942/datas/profile.jpeg",
  interests: [
    "Blockchain",
    "Communication",
    "Fintech",
    "Lifehacks",
    "Machine Learning/AI",
    "Productivity",
    "Web",
    "Design",
  ],
  likes: [
    "init-gaxp0c",
    "teddy-ai",
    "traceker",
    "foundair",
    "eco-scan-zlgkus",
    "carbonaltdel",
    "en-ft",
    "nightlight-64g8wc",
    "allvisor",
    "homie-hub",
    "demoment",
    "definso",
    "lifefriend",
    "telenotes",
    "studypineapple",
    "pandemetry",
  ],
  links: {
    github: "https://github.com/edisonqu",
    linkedin: "https://www.linkedin.com/in/edisonqu/",
    twitter: null,
    website: "http://edisonqu.com/",
  },
  location: "Toronto, Ontario, Canada",
  name: "Edison Qu",
  projects: [
    "eyetunes-29oe6q",
    "ribbit-8sc5kj",
    "gamegpt",
    "eco-scan-zlgkus",
    "traceker",
    "accessai",
    "foundair",
    "certuary",
    "etherspy",
    "health-hub-hi0tmo",
    "en-ft",
    "demoment",
    "definso",
    "decharity-gvhxw2",
  ],
  skills: ["web3"],
  username: "web3",
};

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

export default function Profile() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-8xl justify-between font-mono text-sm lg:flex">
        <div className="w-1/3 p-8 flex flex-col justify-between h-screen">
          <div className="gap-8 flex flex-col pt-4">
            <button
              className="text-gray-800  rounded-sm w-fit"
              onClick={() => router.push("/")}
            >
              <img src="/back.svg" alt="back" className="w-6 h-6" />
            </button>
            <img
              src={user.image}
              alt="profile"
              className="rounded-sm w-48 h-48"
            />
            <div className="gap-4 flex flex-col">
              <h1 className="text-4xl font-bold">{user.name}</h1>
              <p>{user.location}</p>
              <p>{user.bio}</p>
            </div>
            <div className="flex flex-wrap w-full gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-gray-100 px-4 py-3 rounded-sm w-fit"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="py-8 ">
            <button className="bg-gray-800 text-gray-100 px-4 py-3 rounded-sm w-fit">
              Add Trophy
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 w-2/3">
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
