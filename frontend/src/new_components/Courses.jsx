import { motion } from "framer-motion";

const courses = [
  {
    title: "Thunder: 100 Days of Code",
    description: "Web Development + System Design + Security + DevOps",
    duration: "100 Days",
    badge: "LIVE",
    badgeColor: "bg-red-600",
    icon: "⚡"
  },
  {
    title: "Generative AI",
    description: "Build autonomous AI agents from scratch",
    duration: "50+ Hours",
    badge: "LIVE",
    badgeColor: "bg-red-600",
    icon: "🤖"
  },
  {
    title: "DSA + GenAI Combo",
    description: "Complete tech stack with DSA and AI",
    duration: "100+ Hours",
    badge: "POPULAR",
    badgeColor: "bg-yellow-500",
    icon: "🎯"
  }
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-black text-white px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our comprehensive courses designed to elevate your skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300"
            >
              {/* Course Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <span className="text-6xl">{course.icon}</span>
              </div>

              {/* Badge */}
              <div className="px-4 -mt-12 relative">
                <span className={`${course.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {course.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm flex items-center">
                    ⏱️ {course.duration}
                  </span>
                  <a href="#" className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
                    Explore Course →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}