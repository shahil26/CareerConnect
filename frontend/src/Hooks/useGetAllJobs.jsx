import { Job_API_END_POINT } from "@/components/utils/constant";
import { setAllJobs, setSearchedQuery } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        if (allJobs.length === 0) { // ✅ Fetch only if no jobs exist
          const res = await axios.get(`${Job_API_END_POINT}/get`, {
            withCredentials: true,
          });

          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
            dispatch(setSearchedQuery("")); // ✅ Reset search on fresh fetch
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch, allJobs.length]); // ✅ Only fetch if jobs are empty

  return null;
};

export default useGetAllJobs;
