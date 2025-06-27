import React from 'react';
// Import your social media SVG icons here if you have them, e.g.:
// import { ReactComponent as InstagramIcon } from '../assets/instagram.svg';
// import { ReactComponent as FacebookIcon } from '../assets/facebook.svg';
// import { ReactComponent as XIcon } from '../assets/x.svg'; // Formerly Twitter
// import { ReactComponent as TikTokIcon } from '../assets/tiktok.svg';

const Footer = () => {
  return (
     <footer className="bg-black text-white py-10 px-6 relative overflow-hidden">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    {/* Left Text */}
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-wider uppercase">
        BASKETBALL <span className="text-white">PRIME</span>
      </h2>
      <p className="mt-2 text-sm md:text-base text-gray-400">
        Dream matchups. Real stats. Simulated battles.
      </p>
    </div>

    {/* Basketball Icon (optional) */}
    <div className="hidden md:block text-orange-500 text-6xl slow-spin">
      🏀
    </div>

    {/* Right: Social Icons + Link */}
    <div className="flex flex-col items-center md:items-end text-sm space-y-2">
      <div className="flex gap-4 text-lg">
        <a href="https://github.com/sameer2831" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/sameer-balkawade/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://instagram.com/_sameer_2831" className="hover:text-primary">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <span className="text-gray-500 font-mono">www.basketballprime.com</span>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="text-center mt-8 text-xs text-gray-500 border-t border-gray-700 pt-4">
    &copy; {new Date().getFullYear()} Basketball PRIME. All rights reserved. Developed By: Sameer Ashok Balkawade.
  </div>
</footer>
  );
};

export default Footer;