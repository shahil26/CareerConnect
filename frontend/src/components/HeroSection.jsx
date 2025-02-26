import { useState } from "react"
import { Search, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "../redux/jobSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function HeroSection() {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(search))
    localStorage.setItem("searchQuery", search) // Save query
    setTimeout(() => navigate("/browse"), 100)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="hero1.mp4" type="video/mp4" />
      </video>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
      >
        Find Your Dream Job with{" "}
        <span className="text-[#e63946]">CareerConnect</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg text-gray-200 max-w-2xl mb-6 drop-shadow-md"
      >
        Connecting talented professionals with top companies. Explore
        opportunities, build your career, and take the next step towards
        success.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full max-w-xl flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-300 px-4 py-2"
      >
        <Search className="text-gray-500 ml-2 opacity-80" size={20} />
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 ml-2 mr-2 px-4 py-3 text-gray-900 bg-transparent placeholder-gray-500 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-lg"
        />

        <Button
          onClick={searchJobHandler}
          className="bg-[#e63946] text-white px-6 py-3 text-lg font-medium rounded-full hover:bg-[#c5303c] transition-all"
        >
          Search
        </Button>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-6 flex justify-center gap-4"
      >
        <Button onClick={()=>navigate("/jobs")}className="flex items-center gap-2 bg-[#7200a8] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1B263B] transition">
          <Briefcase size={18} /> Explore Jobs
        </Button>
      </motion.div>
    </section>
  )
}
