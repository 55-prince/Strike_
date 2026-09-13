import { Link } from 'react-router-dom'; // Use Link for internal navigation if needed
import { Navbar, Hero, Courses, Features, FAANGSection, Mentors, Footer, Testimonials } from '../new_components';


function Homepage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar is fixed, so it stays on top */}
      <Navbar />
      
      {/* Just render the sections directly. NO Routes here! */}
      <div className="pt-16"> {/* Add padding top since navbar is fixed */}
        <Hero />
        <Courses />
        <Features />
        <FAANGSection />
        <Mentors />
        <Testimonials />
        
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;