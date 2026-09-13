import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current path

  // Define navigation items
  const navItems = [
    { name: "Home", type: "scroll", anchor: "home" },
    { name: "Courses", type: "scroll", anchor: "courses" },
    { name: "Practice", type: "route", path: "/practice" },
    { name: "Articles", type: "scroll", anchor: "articles" },
    { name: "Quiz", type: "scroll", anchor: "quiz" },
    { name: "System Design", type: "scroll", anchor: "system-design" },
    { name: "Contests", type: "scroll", anchor: "contests" },
  ];

  // Helper function to handle clicks
  const handleNavClick = (item) => {
    setIsOpen(false); // Close mobile menu if open

    if (item.type === "route") {
      // If it's a route (Practice), just go there
      // (Link component handles the navigation automatically)
      return; 
    }

    // If it's a scroll anchor:
    if (location.pathname !== "/") {
      // If we are NOT on the homepage, go to homepage first, then scroll after a brief delay
      // We use a timeout to let the page render before scrolling
      setTimeout(() => {
        const element = document.getElementById(item.anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we ARE on the homepage, just scroll
      const element = document.getElementById(item.anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            STRIKE
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              item.type === "route" ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={`#${item.anchor}`} // Keep href for basic functionality
                  onClick={(e) => handleNavClick(item)} // Add smart logic
                  className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          <button className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                item.type === "route" ? (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block py-2 hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={`#${item.anchor}`}
                    onClick={(e) => handleNavClick(item)} // Add smart logic
                    className="block py-2 hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                )
              ))}
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full font-medium mt-4">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}