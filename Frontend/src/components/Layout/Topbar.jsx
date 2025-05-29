import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-400">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagramSquare className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaGithubSquare className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We Ship World Wide - Fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-400">
            +91 7302518007
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
