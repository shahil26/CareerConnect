import React, { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from "../utils/constant"
import { toast } from "sonner"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"
import { motion } from "framer-motion"

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  })

  const navigate = useNavigate()
  const { loading, user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })

      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
        >
          <h1 className="text-xl font-bold text-gray-800 text-center mb-3">
            Create an Account
          </h1>

          {/* Full Name */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">
              Phone Number
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">
              Profile Picture
            </Label>
            <Input
              accept="image/*"
              name="file"
              onChange={changeFileHandler}
              type="file"
              className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <Label className="block text-gray-700 font-medium">Role</Label>
            <div className="flex items-center gap-3 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="accent-[#457b9d] w-4 h-4"
                />
                <span className="text-gray-700">Student</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="accent-[#457b9d] w-4 h-4"
                />
                <span className="text-gray-700">Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-[#7200a8] hover:bg-[#b82b37] transition rounded-md flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 text-sm mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#e63946] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}

export default SignUp
