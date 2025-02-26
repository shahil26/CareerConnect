import React, { useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { COMPANY_API_END_POINT } from "../utils/constant"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import { motion } from "framer-motion"

const CreateCompanies = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty.")
      return
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/create/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong! Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Full-width Navbar */}
      <Navbar className="w-full shadow-md bg-white" />

      {/* Page Container */}
      <div className="flex items-center justify-center flex-grow px-4 sm:px-6 lg:px-8">
        {/* Animated Card */}
        <motion.div
          className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Create Your Company
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Build your company's profile in just a few steps. Enter a name for
              your company to get started. You can always modify it later.
            </p>
          </div>

          {/* Input Field */}
          <div className="mb-4">
            <Label className="text-gray-700 font-medium text-sm sm:text-base">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="Enter company name (e.g., JobHunt, Microsoft, etc.)"
              className="mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#457b9d] w-full text-sm sm:text-base"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Choose a unique and recognizable name for your business.
            </p>
          </div>

          {/* Information Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-md mb-6 border border-gray-200 text-xs sm:text-sm">
            <h2 className="text-sm sm:text-md font-semibold text-gray-700">
              Why is this important?
            </h2>
            <p className="mt-1 text-gray-600">
              Your company name is how your business will be identified within
              our platform. Make sure it's professional and easy to remember!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border-gray-400 text-gray-700 text-sm sm:text-base"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#7200a8] hover:bg-[#1d3557] text-white rounded-lg shadow-md transition-all text-sm sm:text-base"
                onClick={registerNewCompany}
              >
                Create Company
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateCompanies
