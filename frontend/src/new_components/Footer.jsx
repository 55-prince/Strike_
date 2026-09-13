import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: ["Home", "Practice", "Courses", "DSA Sheet", "Quiz"],
    company: ["About Us", "Contact", "Careers", "Blog"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
              STRIKE
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering developers with cutting-edge tools and resources. 
              Powered by Coder Army, Strike is your gateway to endless coding with guided lessons.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              {links.platform.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {links.company.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              {links.legal.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} STRIKE. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}