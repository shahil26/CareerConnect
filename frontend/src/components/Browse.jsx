import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/Hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { filteredJobs, searchedQuery } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-6 text-center md:text-left">
          {searchedQuery ? `Search Results (${filteredJobs.length})` : `All Jobs (${filteredJobs.length})`}
        </h1>

        {/* Centering and reducing gaps */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl place-items-center">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <Job key={job._id} job={job} />)
            ) : (
              <p className="text-gray-600 col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                No jobs found. Try searching again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
