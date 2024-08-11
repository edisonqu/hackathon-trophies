"use client";
import Badge from "@/components/badge";
import { useParams, useRouter } from "next/navigation";

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
    Grow your developer ecosystem and promote your platform.,"created_by":["Edison Qu"],"gallery":[{"caption":null,"url":"https://www.youtube.com/embed/OFZDiMEO--0?enablejsapi=1&hl=en_US&rel=0&start=&version=3&wmode=transparent"},{"caption":"","url":"https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/684/datas/original.png"},{"caption":"","url":"https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/688/datas/original.png"},{"caption":"","url":"https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/687/datas/original.gif"},{"caption":"","url":"https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/686/datas/original.gif"},{"caption":"","url":"https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/379/685/datas/original.png"}],"liked_by":["taimooraleem","jeremysu64","itsannawei","StephenNi","vihaan436","yasmine1534","michelle4891","notzree","Rajdeep-k7","boredzana"],"likes":10,"submissions":[{"title":"","url":"https://hackville2023.devpost.com/","winner_description":"1st Place: Anker Soundcore 3 \u2014 Bluetooth Speaker with Stereo Sound","winner_label":"Winner"},{"winner_description":"1st Place: Anker Soundcore 3 \u2014 Bluetooth Speaker with Stereo Sound","winner_label":"Winner"},{"winner_description":"Google Developers Student Club Challenge","winner_label":"Winner"}],"submitted_to":["Hackville 2023"],"updates":[{"comments":[],"created_at":"2023-02-12T06:08:41.000Z","update":"
    Leave feedback in the comments!
    
    ","user":"web3"}]}`,
};

const ProjectPage = (props: any, { id }: { id: string }) => {
  console.log(id);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-8xl items-center justify-between font-mono text-sm lg:flex flex-col">
        <div className="py-24">
          <h1 className="text-4xl font-bold">{id}</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full">
          <Badge />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
