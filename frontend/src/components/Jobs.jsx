import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery = "" } = useSelector((store) => store.job || {});
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery.trim() === "" || searchedQuery === "All Jobs") {
      console.log("allJobs", allJobs);
      setFilterJobs(allJobs);
    } else {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      console.log("filteredJobs", filteredJobs);
      setFilterJobs(filteredJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Sidebar (Filters) */}
          <div className="md:w-1/5 lg:w-1/5 w-full h-auto md:h-[87vh] overflow-y-auto bg-white shadow-md rounded-lg">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-auto md:h-[87vh] overflow-y-auto pb-5 flex justify-center">
            {filterJobs.length === 0 ? (
              <span className="block text-center text-gray-500 mt-10">No jobs found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
