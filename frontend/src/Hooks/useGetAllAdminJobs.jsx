import { Job_API_END_POINT } from "@/components/utils/constant"
import { setAllAdminJobs } from "@/redux/jobSlice"
import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${Job_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllAdminJobs();
  }, [dispatch])
}

export default useGetAllAdminJobs
