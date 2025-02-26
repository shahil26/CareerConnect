import React, { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import { APPLICATION_API_END_POINT } from "../utils/constant"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "../redux/applicationSlice"

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        )
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllApplicants()
  }, [params.id, dispatch])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-bold text-2xl text-gray-900 mb-6">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default Applicants
