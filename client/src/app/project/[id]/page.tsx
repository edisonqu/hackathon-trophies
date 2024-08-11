"use client";
import Badge from "@/components/badge";
import Nav from "@/components/nav";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import abi from '../../../../public/abi.json'

// @ts-ignore
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

  if (!projectJSON) {
    return <div>Loading project data...</div>; // Show a loading state until the project data is fetched
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
      router.push(`https://base-sepolia.blockscout.com/address/${tx}`)
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
                {/* @ts-ignore */}
                {projectJSON?.projectName || 'No Project Name Available'}
              </h1>
                {/* @ts-ignore */}

              <h1 className="text-4xl font-normal">@ {projectJSON?.submitted_to?.join(', ')}</h1>
              <div className="whitespace-pre-line leading-2">
                <div className="space-y-2">
                {/* @ts-ignore */}

                  {projectJSON?.content?.split("\n\t").map((c, index) => (
                    <div key={index}>{c.trim()}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                {/* @ts-ignore */}

                {projectJSON?.created_by?.map((creator, index) => (
                  <div key={index} className="flex gap-[10px] items-center">
                    <div className="font-bold text-xl py-[10px]">{creator}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-2">
                {/* @ts-ignore */}

              {projectJSON?.built_with?.map((tool) => (
                <span
                  key={tool}
                  className="bg-gray-100 px-4 py-3 rounded-sm w-fit"
                >
                  {tool}
                </span>
              ))}
                {/* @ts-ignore */}

              {projectJSON?.submissions?.[0] && (
                <span
                  className="bg-gray-200 px-4 py-3 rounded-sm w-fit"
                >
                {/* @ts-ignore */}

                  {projectJSON.submissions[0].winner_description || 'No Description'}
                </span>
              )}
            </div>
          </div>
          <div className="py-8">
            <button
              onClick={() => {
                router.push('https://stellar-trophies.testnet.nfts2.me/')
              }}
              className="bg-gray-800 text-gray-100 px-4 py-3 rounded-sm w-fit cursor-pointer"
            >
              Add Trophy
            </button>
          </div>
        </div>
        <div className="w-2/3 h-screen rounded-sm overflow-hidden">
                {/* @ts-ignore */}

          <Badge color={"cyan"} label={"some label"} />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;