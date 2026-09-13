import { motion } from "framer-motion";

// Company list with logos
const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
];

// Duplicate the list to create a seamless loop
const infiniteScrollData = [...companies, ...companies, ...companies];

export default function FAANGSection() {
  return (
    <section id="faang" className="py-20 bg-black text-white px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get All Premium Questions Asked In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">FAANG Companies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master the coding challenges used by the world's top tech companies.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks for smooth fade-in/out on edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Animated Track */}
        <motion.div
          className="flex items-center w-full"
          animate={{ x: [0, -50 * 100] }} 
          transition={{ 
            x: { 
              repeat: Infinity, 
              duration: 30, 
              ease: "linear" 
            } 
          }}
        >
          {infiniteScrollData.map((company, idx) => (
            <motion.div
              key={`${company.name}-${idx}`}
              className="flex-none mx-6 md:mx-10" // Adjusted spacing
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition transform shadow-lg shadow-purple-900/50">
          Go Ahead
        </button>
      </div>
    </section>
  );
}