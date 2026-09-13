import { motion } from "framer-motion";

const features = [
  {
    title: "Interview Preparation",
    description: "Learn faster with hands-on tracks and mentor feedback.",
    icon: "🎯"
  },
  {
    title: "AI Support",
    description: "24/7 AI-powered assistance for your coding journey.",
    icon: "🤖"
  },
  {
    title: "Live Projects",
    description: "Build real-world projects to showcase your portfolio.",
    icon: "💻"
  },
  {
    title: "Community Access",
    description: "Join thousands of developers in our community.",
    icon: "👥"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black text-white px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Learn smarter with modern tools, guided mentors, and a platform built to help you grow faster
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-900 p-8 rounded-2xl text-center hover:bg-gray-800 transition border border-gray-800 hover:border-purple-500"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}