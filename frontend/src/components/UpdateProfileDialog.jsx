import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "./utils/constant"
import { toast } from "sonner"
import { setUser } from "../redux/authSlice"

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: null, 
  })

  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0] 
    if (file) {
      setInput({ ...input, file })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true) 
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills.join(",")) 
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1d3557] text-center sm:text-left">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form className="mt-4 space-y-4" onSubmit={submitHandler}>
          {[
            { label: "Name", name: "fullname", type: "text", value: input.fullname },
            { label: "Email", name: "email", type: "email", value: input.email },
            { label: "Phone Number", name: "phoneNumber", type: "text", value: input.phoneNumber },
            { label: "Bio", name: "bio", type: "text", value: input.bio },
            { label: "Skills", name: "skills", type: "text", value: input.skills.join(", ") },
          ].map((field, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <Label htmlFor={field.name} className="text-gray-600 font-medium w-full sm:w-1/3">{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={(e) =>
                  field.name === "skills"
                    ? setInput({ ...input, skills: e.target.value.split(",") })
                    : changeEventHandler(e)
                }
                className="mt-1 sm:mt-0 w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Label htmlFor="file" className="text-gray-600 font-medium w-full sm:w-1/3">Resume</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="mt-1 sm:mt-0 w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
            />
          </div>

          <DialogFooter>
            {loading ? (
              <Button
                disabled
                className="w-full bg-[#457b9d] text-white py-2 px-4 rounded-lg flex items-center justify-center transition-opacity opacity-70 cursor-not-allowed"
              >
                <Loader2 className="mr-2 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#457b9d] to-[#1d3557] text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200"
              >
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
