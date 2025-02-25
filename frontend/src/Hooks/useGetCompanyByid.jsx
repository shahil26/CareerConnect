import { COMPANY_API_END_POINT } from "@/components/utils/constant"
import { setSingleCompany } from "@/redux/companySlice"
// import { setAllJobs} from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchSingleCompany = async () => {
      if (!companyId) {
        console.warn("🚨 Company ID is undefined! Skipping fetch.")
        return
      }
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        )
        console.log("Fetched Company:", res.data.company)
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company))
        }
      } catch (error) {
        console.error(
          "🔥 API Fetch Error:",
          error.response?.data || error.message
        )
      }
    }
    fetchSingleCompany()
  }, [companyId, dispatch])
}

export default useGetCompanyById
