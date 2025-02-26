import React, { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "../Hooks/useGetAllCompanies"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "../redux/companySlice"
import { motion } from "framer-motion"

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <motion.div 
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <motion.div 
            className="relative w-full sm:w-96"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              className="w-full p-3 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-[#7200a8] transition-all outline-none"
              placeholder="🔍 Search for companies..."
              onChange={(e) => setInput(e.target.value)}
            />
          </motion.div>

          {/* New Company Button */}
          <motion.button
            onClick={() => navigate("/admin/companies/create")}
            className="px-6 py-3 text-white bg-[#7200a8] hover:bg-purple-700 rounded-full shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + New Company
          </motion.button>
        </div>

        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </motion.div>
  )
}

export default Companies
