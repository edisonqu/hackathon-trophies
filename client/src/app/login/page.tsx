"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

// Adjust the import based on your setup

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user information
      const userResponse = await fetch(
        `https://hackathon-trophies.onrender.com/user/${username}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userData = await userResponse.json();
      setUserInfo(userData);

      // Fetch user's project list
      const projectResponse = await fetch(
        `https://hackathon-trophies.onrender.com/project-list/${username}`
      );
      if (!projectResponse.ok) {
        throw new Error("Failed to fetch project list");
      }
      const projectData = await projectResponse.json();
      setProjects(projectData);
      setError(null); // Reset any previous errors
    } catch (err) {
      setError(err.message);
      setUserInfo(null); // Reset userInfo in case of error
      setProjects([]); // Reset projects in case of error
    }
  };

  const handleProjectChange = (value: any) => {
    setSelectedProject(value);
  };

  const handleProjectSubmit = () => {
    if (selectedProject) {
      // Navigate to the project page using window.location
      window.location.href = `/project/${selectedProject}`;
    }
  };

  const handleVerify = async (proof: ISuccessResult) => {
    console.log("handle verify");
    console.log("this is the proof", proof);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Verification failed");
      }

      // const data = await res.json();
      console.log("Verification response:");
    } catch (error) {
      console.error("Verification error:", error);
      throw new Error("Verification failed"); // IDKit will display this error message
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    // window.location.href = "/success";
    setWorldcoinVerified(true);
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cream">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="trophieslogoBLACK.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!worldcoinVerified && <IDKitWidget
              app_id={process.env.NEXT_PUBLIC_APP_ID || "default_app_id"} // Provide a default value
              action="verify"
              onSuccess={onSuccess}
              handleVerify={handleVerify}
            >
              {({ open }: { open: () => void }) => (
                <button
                  className="flex items-center justify-center w-full rounded-md bg-gray-600 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={open}
                >
                  <span className="mr-2 text-white text-sm">Connect to</span>
                  <img
                    src="Worldcoin_LogoWhite.png"
                    alt="Worldcoin Logo"
                    className="h-6"
                  />
                </button>
              )}
            </IDKitWidget>}

            <div>
              <p className="">Please enter your Devpost username.</p>
              <div className="mt-2">
                <input
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-username"
                  className="block w-full rounded-md bg-gray-800 border border-gray-600 py-2 px-3 text-gray-300 placeholder-gray-500 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          {error && <div className="mt-4 text-red-500">Error: {error}</div>}

          {userInfo && projects.length > 0 && (
            <div className="mt-4">
              <label
                htmlFor="project"
                className="block text-sm font-medium text-gray-300"
              >
                Select a Project
              </label>
              <Select onValueChange={handleProjectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project, index) => (
                    <SelectItem key={index} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProject && (
                <div className="mt-4">
                  <button
                    onClick={handleProjectSubmit}
                    className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit Project
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
