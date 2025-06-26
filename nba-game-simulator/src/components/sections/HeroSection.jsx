import { Link } from 'react-router-dom';
import hero from '../../assets/hero-basketball-prime.png';
import { Link as ScrollLink } from 'react-scroll';

export default function HeroSection() {
  return (
    <section id="Hero" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-16 md:py-0 gap-10">
      <div className="flex-1 max-w-md md:max-w-lg">
        <img src={hero} alt="NBA Sim Logo" className="w-full object-contain" />
      </div>
      <div className="flex-1">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">NBA Match Simulator</h1>
        <h2 className="text-3xl font-bold mb-4 text-primary">Dream Matchups. Real Stats. Epic Showdowns.</h2>
        <p className="text-xl mb-4 max-w-xl">
          Build your ultimate 5v5 NBA lineups using legends from 2000 onwards in their prime. Run realistic simulations powered by advanced metrics.
        </p>
        <p className="text-lg mb-6 max-w-xl">
          Experience thrilling, stat-based basketball games with momentum, fatigue, and dynamic outcomes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link to="/simulator">
            <button className="bg-primary text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition">Start Simulation</button>
          </Link>
          <ScrollLink to="Features" smooth={true} duration={500} offset={-70}>
            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
                Learn More
            </button>
            </ScrollLink>
        </div>
      </div>
    </section>
  );
}
