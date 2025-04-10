import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { APPLICATION_API_END_POINT } from "../utils/constant"
import axios from "axios"

const shortListingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application)

  const statusHandler = async (selectedStatus, applicantId) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicantId}/update`,
        { status: selectedStatus },
        {
          withCredentials: true,
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <Table className="min-w-full">
        <TableCaption>A list of recent applied users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="text-sm md:text-base">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="text-sm md:text-base">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="text-sm md:text-base">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="text-sm md:text-base">
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    // href={item?.applicant?.profile?.resume}
                    target="_blank"
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      item?.applicant?.profile?.resume
                    )}&embedded=true`}
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
              <TableCell className="text-sm md:text-base">
                {item?.applicant?.createdAt
                  ? item?.applicant.createdAt.split("T")[0]
                  : "N/A"}
              </TableCell>
              <TableCell className="text-sm md:text-base text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-500 hover:text-gray-700" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortListingStatus.map((status, index) => (
                      <div
                        key={index}
                        className="py-1 cursor-pointer hover:bg-gray-100 px-2 rounded"
                        onClick={() => statusHandler(status, item._id)}
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
