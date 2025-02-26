import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "../redux/jobSlice"

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Cybersecurity Analyst",
  "Blockchain Developer",
]

const NewsBulletin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (category) => {
    dispatch(setSearchedQuery(category))
    navigate("/browse")
  }

  return (
    <div className="relative py-6 px-8 bg-white mb-0">
      {/* Scrolling Animation Styles */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
            display: flex;
            white-space: nowrap;
            width: max-content;
          }
        `}
      </style>

      {/* Scrolling Carousel Container */}
      <div className="overflow-hidden w-full">
        <div className="animate-scroll flex gap-8">
          {[...categories, ...categories].map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="flex-shrink-0 bg-white px-6 py-3 rounded-full shadow-md border border-gray-400 text-lg font-semibold text-[#1d3557] cursor-pointer transition-all duration-300"
            >
              <Button 
                onClick={() => searchJobHandler(cat)} 
                variant="ghost" 
                className="text-[#1d3557] font-medium transition-all duration-300 hover:bg-[#457b9d] hover:text-white px-6 py-2"
              >
                {cat}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsBulletin
