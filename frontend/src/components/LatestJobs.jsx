import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  console.log("allJobs",allJobs);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 bg-white">
      <h1 className="text-2xl md:text-3xl  font-extrabold text-[#495057] mb-8 ">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">No Jobs Available</div>
        ) : (
          allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
