//components/Hero.jsx
import React from "react";
import { FaCheckCircle, FaRocket, FaTasks } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-rose-200/20 via-purple-200/20 to-teal-200/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-teal-200/20 via-purple-200/20 to-rose-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <div className="inline-block glass-effect rounded-full px-6 py-2 mb-8 animate-float">
          <span className="gradient-text font-semibold flex items-center gap-2">
            <FaRocket className="text-rose-500" />
            Task Tracker Pro
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Manage Your</span>
          <br />
          <span className="text-gray-800">Tasks Effortlessly</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Organize, track, and complete your tasks with our beautiful and
          intuitive task management system. Stay productive and achieve more!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: <FaCheckCircle />, text: "Real-time Updates" },
            { icon: <FaTasks />, text: "Smart Organization" },
            { icon: <FaRocket />, text: "Lightning Fast" },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <span className="text-purple-500">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full glass-effect flex items-center justify-center">
            <div className="w-1 h-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
