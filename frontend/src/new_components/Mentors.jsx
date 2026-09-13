import { motion } from "framer-motion";

const mentors = [
  {
    name: "Rohit N",
    role: "Founder & Lead Instructor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit&backgroundColor=b6e3f4" 
  },
  {
    name: "Tandon",
    role: "Co-Founder & Senior Instructor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tandon&backgroundColor=c0aede"
  },
  {
    name: "Priya S",
    role: "Senior AI Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf"
  },
  {
    name: "Amit K",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=d1d4f9"
  }
];

export default function Mentors() {
  return (
    <section id="mentors" className="py-20 bg-black text-white px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Mentors</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Learn from industry experts who are passionate about teaching and mentoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-6 rounded-2xl text-center border border-gray-800 hover:border-purple-500 transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover bg-gray-800" 
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
              <p className="text-gray-400 text-sm">{mentor.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}