import { Bookmark, MapPin, Briefcase, DollarSign, Building2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRupeeSign } from "react-icons/fa"

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      whileHover={{ scale: 1.05 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-[314px] h-[400px] p-6 rounded-xl shadow-md bg-white border border-gray-200 transition-all hover:shadow-lg flex flex-col justify-between"
    >
      {/* Job Post Timing & Bookmark */}
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <p>{job?.createdAt === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
        >
          <Bookmark className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Company Logo & Name */}
      <div className="flex items-center gap-4 mt-4">
        <Avatar className="w-14 h-14 border border-gray-300 shadow-sm">
          {job?.company?.logo ? (
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          ) : (
            <AvatarFallback className="bg-gray-100">
              <Building2 size={24} className="text-gray-500" />
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-gray-800 line-clamp-1">{job?.company?.name || "Unknown Company"}</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />{job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h1 className="font-bold text-lg text-gray-900 line-clamp-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100" variant="ghost">
          <Briefcase size={14} className="mr-1" /> {job?.position}
        </Badge>
        <Badge className="text-red-700 font-semibold bg-red-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-700 font-semibold bg-green-100" variant="ghost">
          <FaRupeeSign size={14} className="mr-1" /> {job?.salary} Lpa
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 w-full py-2 rounded-lg"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          View Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#7200a8] text-white hover:bg-[#5a0080] w-full py-2 rounded-lg"
        >
          Save for Later
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Job;
