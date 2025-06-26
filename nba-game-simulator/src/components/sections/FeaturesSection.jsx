import { useState, useEffect, useRef } from 'react';
import { Cpu, BarChart2, Activity, ClipboardList, ShieldCheck, LayoutGrid } from 'lucide-react';

const features = [
  {
    title: "Prime Player Selection",
    desc: "Select players from 2000 onwards at their statistical peak for ultimate matchups.",
    icon: <LayoutGrid className="w-10 h-10 text-primary" />,
  },
  {
    title: "Stat-Based Logic",
    desc: "Simulate matches using real player stats like PER, FG%, USG%, and more.",
    icon: <BarChart2 className="w-10 h-10 text-primary" />,
  },
  {
    title: "Momentum & Fatigue",
    desc: "Dynamic momentum shifts and fatigue modeling for lifelike game flow.",
    icon: <Activity className="w-10 h-10 text-primary" />,
  },
  {
    title: "Detailed Stats & Logs",
    desc: "Box scores, play-by-play logs, and quarter breakdowns after each match.",
    icon: <ClipboardList className="w-10 h-10 text-primary" />,
  },
  {
    title: "Realistic Simulations",
    desc: "Advanced engine using PER, USG%, TS%, and fatigue for accurate outcomes.",
    icon: <Cpu className="w-10 h-10 text-primary" />,
  },
  {
    title: "Quarter-by-Quarter Insights",
    desc: "Scoring breakdowns, momentum shifts, and clutch metrics by quarter.",
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
  },
];

export default function FeaturesSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // disconnect after first trigger for performance
        }
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Features"
      ref={sectionRef}
      className="min-h-screen py-24 px-6 bg-gradient-to-br from-gray-950 to-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16">Features</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-primary/40 hover:scale-[1.02] transform transition duration-300 ease-in-out`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${i * 150}ms, transform 0.6s ease-out ${i * 150}ms`,
              }}
            >
              <div className="mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
