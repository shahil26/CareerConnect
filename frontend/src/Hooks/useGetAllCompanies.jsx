import { COMPANY_API_END_POINT } from "@/components/utils/constant" // ✅ Use the correct endpoint
import { setCompanies } from "@/redux/companySlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const useGetAllCompanies = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies)) 
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [dispatch]) 
  return { loading }
}

export default useGetAllCompanies
