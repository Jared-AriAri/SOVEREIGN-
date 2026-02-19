import React from 'react';
import { DATA_SOURCES } from '@/data/products';

const stats = [
  {
    value: 'Up to 6,000 L/day',
    label: 'Per industrial unit — enough for an entire community',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    ),
  },
  {
    value: '20–220 L/day',
    label: 'Portable & mid-scale units for homes, clinics, and schools',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
  },
  {
    value: '~30% of Navajo Households',
    label: 'Still haul water for daily use — AWG can change that',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    value: '2.2 Million Americans',
    label: 'Lack access to clean running water — tribal communities disproportionately affected',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
  },
];

const ImpactCards: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[#071A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">
            The Impact at a Glance
          </h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">
            Atmospheric water generation delivers clean drinking water where it's needed most — without infrastructure, without deliveries, without dependency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative p-6 bg-gradient-to-b from-[#0d2a35] to-[#091f28] border border-[#0077C8]/10 rounded-2xl hover:border-[#0077C8]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0077C8]/5"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-[#0077C8]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="font-display text-xl md:text-2xl font-bold text-[#F7F9FB] mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-[#F7F9FB]/55 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#F7F9FB]/30">
            Sources:{' '}
            {DATA_SOURCES.map((src, i) => (
              <span key={src.name}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A99D]/50 hover:text-[#00A99D] underline underline-offset-2 transition-colors"
                >
                  {src.name}
                </a>
                {i < DATA_SOURCES.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCards;
