import React from "react";
import { Badge } from "./ui/badge";
import { Briefcase, MapPin, DollarSign, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa"

// eslint-disable-next-line react/prop-types
const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`description/${job._id}`)}
      className="cursor-pointer p-6 rounded-lg shadow-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-white hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.05] text-gray-800 w-full max-w-lg sm:max-w-md"
    >
      {/* Header: Company Logo & Info */}
      <div className="flex items-center mb-6">
        {job?.company?.logo ? (
          <img
            src={job.company.logo}
            alt="Company Logo"
            className="w-14 h-14 object-cover rounded-full border border-gray-300 shadow-md"
          />
        ) : (
          <Building2 size={32} className="text-gray-500" />
        )}
        <div className="ml-4">
          <h1 className="font-bold text-xl text-gray-900">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={16} className="text-blue-500" /> {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-6">
        <h1 className="font-extrabold text-2xl sm:text-xl text-gray-900 mb-2">{job?.title}</h1>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap items-center mt-4 p-4">
        <Badge className="bg-blue-500 text-white font-medium rounded-md shadow-md mr-2 mb-2">
          <Briefcase size={14} className="mr-1" /> {job?.position}
        </Badge>
        <Badge className="bg-gray-800 text-white font-medium rounded-md shadow-md mr-2 mb-2">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-500 text-white font-medium rounded-md shadow-md flex items-center gap-1 mb-2">
          <FaRupeeSign size={16} /> {job?.salary} Lpa
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
