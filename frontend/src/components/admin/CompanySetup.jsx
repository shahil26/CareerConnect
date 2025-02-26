import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, ImageIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../Hooks/useGetCompanyByid";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error("Failed to update company details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 bg-white shadow-lg rounded-xl p-6 sm:p-8 mt-10">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-semibold hover:text-black"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft /> Back
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ label: "Company Name", name: "name" },
              { label: "Description", name: "description" },
              { label: "Website", name: "website" },
              { label: "Location", name: "location" }].map(({ label, name }) => (
              <div key={name}>
                <Label className="text-gray-700">{label}</Label>
                <Input
                  type="text"
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 border border-gray-300 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
              {input.file || singleCompany?.file ? (
                <img
                  src={input.file ? URL.createObjectURL(input.file) : singleCompany?.file}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <Label className="text-gray-700">Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="p-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
          >
            <Button
              type="submit"
              className="w-full bg-[#7200a8] hover:bg-purple-700 text-white py-3 rounded-lg shadow-md transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
                </>
              ) : (
                "Update Company"
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CompanySetup;
