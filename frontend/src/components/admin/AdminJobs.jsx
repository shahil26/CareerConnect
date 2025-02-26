import React, { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "@/redux/jobSlice"
import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "../Hooks/useGetAllAdminJobs"
import { motion } from "framer-motion"

const AdminJobs = () => {
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Container */}
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          {/* Search Input Field with Icon */}
          <div className="relative w-full sm:w-80">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
            <Input
              className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-[#7200a8] transition-all outline-none"
              placeholder="Filter by name, role..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* New Jobs Button with Animation */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="px-6 py-3 bg-[#7200a8] hover:bg-[#1d3557] text-white rounded-lg shadow-md transition-all"
              onClick={() => navigate("/admin/jobs/create")}
            >
              + New Job
            </Button>
          </motion.div>
        </div>

        {/* Job Listings Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
