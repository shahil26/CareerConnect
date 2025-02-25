import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { LogOut, User2, Menu, X, UserRoundPenIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { USER_API_END_POINT } from "../utils/constant"
import axios from "axios"
import { setUser } from "@/redux/authSlice"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center container mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h1 className="text-2xl font-bold text-[#343a40]">
            Career<span className="text-[#7200a8]">Connect</span>
          </h1>
        </div>
        <div
          className={`lg:flex items-center gap-8 ${
            menuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-white p-4 shadow-md"
              : "hidden"
          } lg:static lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row font-medium items-center gap-6 text-[#495057]">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#212529] cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#212529] cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#212529] cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#212529] cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#212529] cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-[#343a40] border-[#6c757d] hover:bg-[#adb5bd]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#7200a8] hover:bg-[#495057] text-[#f8f9fa]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer transition-all hover:scale-105">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    <UserRoundPenIcon />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-xl rounded-xl p-4 w-60 border border-gray-200 transform transition-all duration-300">
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="cursor-pointer w-12 h-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <UserRoundPenIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3">
                  {user && user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <User2 size={20} className="text-gray-600" />
                      <span className="text-gray-700">Profile</span>
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-2 px-3 py-2 mt-2 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
