import Header from "@/components/ui/custom/Header";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Build Your Perfect Resume
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Create professional resumes in minutes with our easy-to-use resume
              builder. No registration required - start building your resume
              right now!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Start Building Resume
              </Link>

              <Link
                to="/dashboard"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                View Examples
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
                <p className="text-gray-600">
                  Build your resume in minutes with our intuitive interface
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">
                  Professional Templates
                </h3>
                <p className="text-gray-600">
                  Choose from multiple professional resume templates
                </p>
            </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl mb-4">💾</div>
                <h3 className="text-xl font-semibold mb-2">Auto-Save</h3>
                <p className="text-gray-600">
                  Your progress is automatically saved as you work
                </p>
              </div>
            </motion.div>
            </div>
          </div>
      </motion.div>
    </div>
  );
};

export default Home;
