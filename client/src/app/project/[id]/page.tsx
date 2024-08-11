"use client";
import Badge from "@/components/badge";
import Nav from "@/components/nav";
import { useRouter } from "next/navigation";
import { useState } from "react";

const project = {
  app_links: [
    "https://www.accessainot.online/",
    "https://docs.google.com/presentation/d/1LiaTGtzxPx6jZ1KQC0JWDZ1jfbXNv_s04THeeoG51GE/edit?usp=sharing",
    "https://github.com/edisonqu/AccessAI",
  ],
  built_with: ["amazon-web-services", "cohere", "openai", "twilio"],
  content: `
    \n\t
    Devpost
    
    \n\t
    Grow your developer ecosystem and promote your platform.`,
  created_by: ["Edison Qu"],
  gallery: [
    {
      caption: null,
      url: "https://www.youtube.com/embed/OFZDiMEO--0?enablejsapi=1&hl=en_US&rel=0&start=&version=3&wmode=transparent",
    },
    {
      caption: "",
      url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/684/datas/original.png",
    },
    {
      caption: "",
      url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/688/datas/original.png",
    },
    {
      caption: "",
      url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/687/datas/original.gif",
    },
    {
      caption: "",
      url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/686/datas/original.gif",
    },
    {
      caption: "",
      url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/685/datas/original.png",
    },
  ],
  liked_by: [
    "taimooraleem",
    "jeremysu64",
    "itsannawei",
    "StephenNi",
    "vihaan436",
    "yasmine1534",
    "michelle4891",
    "notzree",
    "Rajdeep-k7",
    "boredzana",
  ],
  likes: 10,
  submissions: [
    {
      title: "",
      url: "https://hackville2023.devpost.com/",
      winner_description:
        "1st Place: Anker Soundcore 3 \u2014 Bluetooth Speaker with Stereo Sound",
      winner_label: "Winner",
    },
    {
      winner_description:
        "1st Place: Anker Soundcore 3 \u2014 Bluetooth Speaker with Stereo Sound",
      winner_label: "Winner",
    },
    {
      winner_description: "Google Developers Student Club Challenge",
      winner_label: "Winner",
    },
  ],
  submitted_to: ["Hackville 2023"],
  updates: [
    {
      comments: [],
      created_at: "2023-02-12T06:08:41.000Z",
      update: "    Leave feedback in the comments!    ",
      user: "web3",
    },
  ],
};

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const [trophyModal, setTrophyModal] = useState(false);

  const router = useRouter();
  if (!params.id) {
    return <div>Loading...</div>;
  }

  console.log(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-8xl items-center justify-between font-mono text-sm lg:flex">
        <div className="w-1/3 p-8 flex flex-col justify-between h-screen">
          <div className="gap-8 flex flex-col pt-4">
            <button
              className="text-gray-800  rounded-sm w-fit"
              onClick={() => router.push("/")}
            >
              <img src="/back.svg" alt="back" className="w-6 h-6" />
            </button>
            <div className="gap-4 flex flex-col">
              <h1 className="text-4xl font-bold">
                {project.submissions[0].winner_description}
              </h1>
              <h1 className="text-4xl font-normal">@ {project.submitted_to}</h1>
              <div className="whitespace-pre-line leading-2">
                <div className="space-y-2">
                  {project.content.split("\n\t").map((c) => (
                    <div>{c.trim()}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-[10px] items-center">
                <div className="font-bold text-xl py-[10px]">Anthony Ung</div>
                <div>@adlskf</div>
                <div className="bg-[#FACC15] p-[10px] font-semibold">
                  Claimed
                </div>
              </div>
              <div className="flex gap-[10px] items-center">
                <div className="font-bold text-xl py-[10px]">Anthony Ung</div>
                <div>@adlskf</div>
                {/* <div className="bg-[#FACC15] p-[10px] font-semibold">
                  Claimed
                </div> */}
              </div>
              <div className="flex gap-[10px] items-center">
                <div className="font-bold text-xl py-[10px]">Anthony Ung</div>
                <div>@adlskf</div>
                {/* <div className="bg-[#FACC15] p-[10px] font-semibold">
                  Claimed
                </div> */}
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-2">
              {project.built_with.map((tool) => (
                <span
                  key={tool}
                  className="bg-gray-100 px-4 py-3 rounded-sm w-fit"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="py-8 ">
            <button
              onClick={() => setTrophyModal(true)}
              className="bg-gray-800 text-gray-100 px-4 py-3 rounded-sm w-fit cursor-pointer"
            >
              Add Trophy
            </button>
          </div>
        </div>
        <div className="w-2/3 h-screen rounded-sm overflow-hidden">
          <Badge color={"cyan"} label={"some label"} />
        </div>
      </div>
      {trophyModal && (
        <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-gray-900/50 grid place-items-center">
          <AddTrophyModal
            onSubmit={(trophy) => {
              setTrophyModal(false);
              return undefined;
            }}
            onClose={() => setTrophyModal(false)}
          />
        </div>
      )}
    </main>
  );
};

export default ProjectPage;

type AddTrophyModalProps = {
  onSubmit: (trophy: string) => void;
  onClose: () => void;
};

const AddTrophyModal = ({ onSubmit, onClose }) => {
  const [trophy, setTrophy] = useState("");

  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-mono"
      }
    >
      <div className="bg-white p-4 rounded-sm grid gap-4 m-2 w-full max-w-lg text-sm">
        {/* <h1 className="text-lg font-semibold">Add Trophy</h1> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return onSubmit(trophy);
          }}
        >
          <p className="py-2">Devpost URL</p>
          <input
            type="text"
            value={trophy}
            onChange={(e) => setTrophy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-sm"
            >
              Add Trophy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
