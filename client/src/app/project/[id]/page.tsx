"use client";
import Badge from "@/components/badge";
import Nav from "@/components/nav";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import abi from '../../../../public/abi.json'

const sendProjectDataToAPI = async (projectName) => {
  try {
    const response = await fetch(`https://hackathon-trophies.onrender.com/project/${projectName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data; // Return the JSON data
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null or an empty object in case of an error
  }
};

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const [projectJSON, setProjectJSON] = useState(null); // Initialize state for the project data
  const [trophyModal, setTrophyModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const projectName = params.id; // Extract the project name dynamically
      sendProjectDataToAPI(projectName).then((data) => {
        if (data) {
          setProjectJSON(data); // Set the project data in state
        }
      });
    }
  }, [params.id]);

  if (!params.id) {
    return <div>Loading...</div>;
  }

  const mintNFT = async () => {
  
    const contractAddress = '0xdCBA455D9065d6A2d4A83623c42aFBd3f148cB78';
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
  
    const contract = new ethers.Contract(contractAddress, abi.result, signer);
  
    try {
      const mintPrice = await contract.mintFee(1); // Assuming mintFee function exists and returns the price for minting 1 NFT
      const tx = await contract.mint({ value: mintPrice, gasLimit: 1 });
      await tx.wait();
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      // @ts-ignore
      if (error.reason) {
        // @ts-ignore
        alert(`Failed to mint NFT: ${error.reason}`);
        // @ts-ignore
      } else if (error.data) {
        // Try to decode the error data
        try {
          // @ts-ignore
          const decodedError = contract.interface.parseError(error.data);
          // @ts-ignore
          alert(`Failed to mint NFT: ${decodedError.name}`);
        } catch {
          alert('Failed to mint NFT. Check console for details.');
        }
      } else {
        alert('Failed to mint NFT. Check console for details.');
      }
    }
  };

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
                {projectJSON.projectName || 'No Project Name Available'}
              </h1>
              <h1 className="text-4xl font-normal">@ {projectJSON.submitted_to.join(', ')}</h1>
              <div className="whitespace-pre-line leading-2">
                <div className="space-y-2">
                  {projectJSON.content?.split("\n\t").map((c, index) => (
                    <div key={index}>{c.trim()}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                {projectJSON.created_by.map((creator, index) => (
                  <div key={index} className="flex gap-[10px] items-center">
                    <div className="font-bold text-xl py-[10px]">{creator}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-2">
              {projectJSON.built_with.map((tool) => (
                <span
                  key={tool}
                  className="bg-gray-100 px-4 py-3 rounded-sm w-fit"
                >
                  {tool}
                </span>
              ))}

              {projectJSON.submissions[0] && (
                <span
                  className="bg-gray-200 px-4 py-3 rounded-sm w-fit"
                >
                  {projectJSON.submissions[0].winner_description || 'No Description'}
                </span>
              )}
            </div>
          </div>
          <div className="py-8">
            <button
              onClick={()=>{
                router.push('https://stellar-trophies.testnet.nfts2.me/')
              }}
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

    </main>
  );
};

export default ProjectPage;

type AddTrophyModalProps = {
  onSubmit: (trophy: string) => void;
  onClose: () => void;
};

// const AddTrophyModal = ({ onSubmit, onClose }) => {
//   const [trophy, setTrophy] = useState("");

//   return (
//     <div
//       className={
//         "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-mono"
//       }
//     >
//       <div className="bg-white p-4 rounded-sm grid gap-4 m-2 w-full max-w-lg text-sm">
//         {/* <h1 className="text-lg font-semibold">Add Trophy</h1> */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             return onSubmit(trophy);
//           }}
//         >
//           <p className="py-2">Devpost URL</p>
//           <input
//             type="text"
//             value={trophy}
//             onChange={(e) => setTrophy(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-sm"
//           />
//           <div className="flex justify-end gap-2 mt-2">
//             <button
//               onClick={onClose}
//               className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-gray-800 text-white px-4 py-2 rounded-sm"
//               onClick={mintNFT}
//             >
//               Add Trophy
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
