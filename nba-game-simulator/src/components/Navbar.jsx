import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import useScrollSpy from './useScrollSpy';
import logo from '../assets/prime_logo-bg.png'

const sectionIds = ['Hero', 'Features', 'Demo', 'About'];

export default function Navbar() {
  const activeId = useScrollSpy(sectionIds, 80);

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
        <img
          src={logo} // or your actual logo path
          alt="Basketball PRIME Logo"
          className="h-14 w-14 object-cover rounded-full"
        />
      </Link>
        <div className="space-x-6 text-sm font-medium">
          {sectionIds.map((id) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className={`capitalize hover:text-primary ${
                activeId === id ? 'text-primary font-semibold underline' : ''
              }`}
            >
              {id === 'hero' ? 'Home' : id}
            </HashLink>
          ))}
          <Link to="/simulator">
            <button className="bg-primary text-black px-4 py-1 rounded hover:bg-yellow-400 transition">
              Try Simulator
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
