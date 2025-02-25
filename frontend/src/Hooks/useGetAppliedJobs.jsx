import { useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react"
import { APPLICATION_API_END_POINT } from "@/components/utils/constant"
import { setAllAppliedJobs } from "@/redux/jobSlice"

const useGetAppliedJobs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        })

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications)) 
        } else {
          // console.warn("API request was successful but returned no data.")
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error)
      }
    }

    fetchAppliedJobs()
  }, [dispatch])
}

export default useGetAppliedJobs
