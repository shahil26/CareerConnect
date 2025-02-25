import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [], // Stores ALL jobs
    filteredJobs: [], // Stores search results
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
      state.filteredJobs = action.payload // Initially, show all jobs
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload
    },
    setAllAppliedJobs: (state, action) => {
      console.log("Updating Redux state with applied jobs:", action.payload)
      state.allAppliedJobs = action.payload
    },
    setSearchedQuery: (state, action) => {
      let query = action.payload;
    
      // ✅ Ensure the payload is a string before calling `toLowerCase()`
      if (Array.isArray(query)) {
        query = query.join(", ").toLowerCase(); // Convert array to string
      } else if (typeof query === "string") {
        query = query.toLowerCase();
      } else {
        query = ""; // Default case if query is undefined or invalid
      }
    
      state.searchedQuery = query;
    
      if (query === "") {
        // ✅ Show all jobs when search is cleared
        state.filteredJobs = [...state.allJobs];
      } else {
        // ✅ Filter jobs based on title, handling multiple keywords
        state.filteredJobs = state.allJobs.filter((job) =>
          job.title.toLowerCase().includes(query)
        );
      }
    },
    
  },
})

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions
export default jobSlice.reducer
