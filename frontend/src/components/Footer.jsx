import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#7200a8] text-white py-10 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Career Connect</h2>
          <p className="text-gray-300">
            Your trusted job portal for seamless career opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-[#a8dadc] transition duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-[#a8dadc] transition duration-300 cursor-pointer">Jobs</li>
            <li className="hover:text-[#a8dadc] transition duration-300 cursor-pointer">Contact</li>
            <li className="hover:text-[#a8dadc] transition duration-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <FaFacebook className="text-xl hover:text-[#a8dadc] transition duration-300 cursor-pointer" />
            <FaTwitter className="text-xl hover:text-[#a8dadc] transition duration-300 cursor-pointer" />
            <FaLinkedin className="text-xl hover:text-[#a8dadc] transition duration-300 cursor-pointer" />
            <FaInstagram className="text-xl hover:text-[#a8dadc] transition duration-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Career Connect. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
