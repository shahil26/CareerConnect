import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps: true});
export const company=mongoose.model("company",companySchema);