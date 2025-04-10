import React, { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
} from "../ui/select" 
import axios from "axios"
import { JOB_API_END_POINT } from "../utils/constant"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { COMPANY_API_END_POINT } from "@/components/utils/constant"

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])

  // const { companies = [] } = useSelector((store) => store.company || {})

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
            withCredentials: true,
          })
          console.log("Companies1:", res.data.companies)
          
          if (res.data.success) {
            setCompanies(res.data.companies)
            // dispatch()
          }
        } catch (error) {
          console.error("Error fetching companies:", error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchCompanies()
    }, [])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleCompanyChange = (value) => {
    setInput({ ...input, companyId: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full my-5 px-4">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-screen-sm w-full border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Select a company using ShadCN Select */}
            {companies.length > 0 && (
              <div className="col-span-2">
                <Select onValueChange={handleCompanyChange} value={input.companyId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companies</SelectLabel>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait..
            </Button>
          ) : (
            <Button className="w-full my-4 bg-[#7200a8]">Post New Job</Button>
          )}

          {/* Message when no companies available */}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PostJob
