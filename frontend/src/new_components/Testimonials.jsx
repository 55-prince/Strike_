import { motion } from "framer-motion";

// Completely rewritten testimonials with new names and unique phrasing
const testimonials = [
  {
    name: "Arjun Mehta",
    text: "The transition from beginner to building complex apps was seamless. The focus on 'why' code works, not just 'how', changed my entire perspective on development."
  },
  {
    name: "Sneha Reddy",
    text: "I was struggling with DSA concepts until I found this platform. The structured approach and daily challenges finally made recursion and graphs click for me."
  },
  {
    name: "Vikram Singh",
    text: "The project-based learning is unmatched. By the time I finished the MERN track, I had three portfolio-ready apps that actually impressed recruiters."
  },
  {
    name: "Ananya Das",
    text: "Live doubt sessions were a game-changer. Instead of getting stuck for days on a bug, I got instant help from mentors who explained the root cause clearly."
  },
  {
    name: "Rohan Gupta",
    text: "What stood out was the community. The peer reviews and collaborative contests kept me accountable and motivated even when the content got tough."
  },
  {
    name: "Kavita Joshi",
    text: "I went from knowing zero JavaScript to deploying a full-stack AI tool in 6 months. The curriculum is perfectly paced for serious learners."
  },
  {
    name: "Aditya Verma",
    text: "The First Principles teaching method is incredible. I don't just memorize syntax anymore; I understand system design patterns that scale."
  },
  {
    name: "Pooja Nair",
    text: "Best investment for my career. The mock interviews and resume reviews gave me the confidence to crack offers at top product companies."
  },
  {
    name: "Siddharth Rao",
    text: "Unlike other courses that just dump content, this one guides you step-by-step. The weekly assignments ensure you actually retain what you learn."
  },
  {
    name: "Ishita Banerjee",
    text: "The GenAI integration with DSA is unique. I learned how to optimize algorithms for AI models, a skill that's in high demand right now."
  },
  {
    name: "Karan Malhotra",
    text: "The recording quality and clarity of explanations are top-tier. I could pause and re-watch complex topics until I fully grasped them."
  },
  {
    name: "Divya Sharma",
    text: "Finally, a course that bridges the gap between academic theory and industry reality. The projects feel like real-world work, not just tutorials."
  }
];

export default function Testimonials() {
  // Duplicate the array to create a seamless loop
  const infiniteData = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-black text-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-[90%]">
        
        {/* Header with Star Icon */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* Star SVG Icon */}
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-400 text-sm uppercase tracking-wider">Community Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted by Future Builders</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
            See how developers transformed their careers with our platform
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Fade Gradients on Left and Right */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Row 1: Scroll Left */}
          <motion.div 
            className="flex gap-4 mb-4 md:mb-6"
            animate={{ x: [0, -50 * 100] }} 
            transition={{ 
              x: { 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
              } 
            }}
          >
            {infiniteData.map((item, idx) => (
              <div key={`row1-${idx}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] mx-2 sm:mx-3">
                <div className="border border-gray-800 rounded-xl sm:rounded-2xl p-5 md:p-6 h-full hover:border-gray-700 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-sm md:text-lg">{item.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Row 2: Scroll Right (Reverse) */}
          <motion.div 
            className="flex gap-4"
            animate={{ x: [-50 * 100, 0] }} 
            transition={{ 
              x: { 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
              } 
            }}
          >
            {infiniteData.map((item, idx) => (
              <div key={`row2-${idx}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] mx-2 sm:mx-3">
                <div className="rounded-xl sm:rounded-2xl p-5 md:p-6 h-full border border-zinc-800 hover:border-gray-700 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-sm md:text-lg">{item.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}