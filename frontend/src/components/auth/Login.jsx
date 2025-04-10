import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // const hasNavigatedRef = useRef(false);

// useEffect(() => {
//   if (user && !hasNavigatedRef.current) {
//     hasNavigatedRef.current = true;
//     navigate("/");
//   }
// }, [user, navigate]);
  

const submitHandler = async (e) => {
  e.preventDefault();

  if (loading) return; // Prevent multiple submissions

  if (!input.email || !input.password || !input.role) {
    toast.error("Please fill all fields.");
    return;
  }

  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      navigate("/"); // ✅ Move navigation here to avoid repeated redirects
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
  } finally {
    dispatch(setLoading(false));
  }
};


  

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <Label className="block text-gray-700 font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label className="block text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#457b9d] transition"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <Label className="block text-gray-700 font-medium">Role</Label>
            <div className="flex items-center gap-4 mt-2">
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
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-[#7200a8] hover:bg-[#b82b37] transition rounded-md flex items-center justify-center shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>

          {/* Signup Redirect */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#e63946] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
