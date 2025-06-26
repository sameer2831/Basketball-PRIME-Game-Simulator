
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import DemoSection from '../components/sections/DemoSection';
import AboutSection from '../components/sections/AboutSection';
//import LiveStatsDashboard from '../components/LiveStatsDashBoard';



export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
