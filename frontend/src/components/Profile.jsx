import React, { useState } from "react"
import Navbar from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Contact, Mail, Pen, User2Icon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "../Hooks/useGetAppliedJobs"
import { motion } from "framer-motion"

const Profile = () => {
  useGetAppliedJobs()
  const { user } = useSelector((store) => store.auth)
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto my-6 px-4 sm:px-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Avatar and User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-gray-300 bg-white flex items-center justify-center">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user.profile.profilePhoto} alt="profile" />
                  ) : (
                    <User2Icon className="h-20 w-20 sm:h-24 sm:w-24" />
                  )}
                </Avatar>
              </motion.div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {user?.fullname || "Unknown User"}
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>
            </div>

            {/* Edit Button (Icon Only on Small Screens) */}
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#7200a8] hover:bg-[#590086] text-white px-3 py-2 rounded-lg shadow-md transition-all flex items-center justify-center"
            >
              <Pen className="h-5 w-5" />
              <span className="hidden sm:inline">Edit Profile</span>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
              <Mail className="h-5 w-5 text-blue-500" />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
              <Contact className="h-5 w-5 text-green-500" />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-[#457b9d] text-white px-3 py-1 rounded-lg shadow-md transition-all 
                     hover:bg-[#1d3557] hover:scale-105 text-sm sm:text-base"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm sm:text-base">NA</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-5">
            <Label className="text-md font-semibold text-gray-800">Resume</Label>
            {user?.profile?.resumeOriginalName ? (
              <div>
              <a
              target="_blank"
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
              rel="noopener noreferrer"
                className="text-blue-500 hover:underline cursor-pointer block mt-1 text-sm sm:text-base"
              >
                {user.profile.resumeOriginalName}
              </a>
              
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
                width="100%"
                height="300"
                title="Resume Preview"
                className="border-0"
              />
              </div>
            ) : (
              <span className="text-gray-500 text-sm sm:text-base">NA</span>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 mt-6"
        >
          <h1 className="font-bold text-lg sm:text-xl text-gray-800">Applied Jobs</h1>
          <AppliedJobTable />
        </motion.div>
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
