import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(cookieParser())

const corsOptions = {
  origin: ["https://career-connect-k57e.vercel.app", 
    "https://career-connect-k57e-8kzgtqdll-shahil26s-projects.vercel.app"],
  credentials: true, // ✅ Lowercase 'credentials'
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handles preflight requests


const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Backend is running!")
})

//api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`)
})
