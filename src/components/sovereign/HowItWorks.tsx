import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Air Filtration',
    description: 'Advanced filtration captures dust, pollen, and airborne particles from the ambient air before processing.',
    color: '#0077C8',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
    ),
  },
  {
    number: '02',
    title: 'Moisture Extraction',
    description: 'Watergen\'s patented GENius™ technology extracts moisture from filtered air with remarkable energy efficiency.',
    color: '#00A99D',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    ),
  },
  {
    number: '03',
    title: 'Purification & UV',
    description: 'Multi-stage treatment including UV sterilization produces clean drinking water that meets EPA standards.',
    color: '#2BA84A',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
  },
  {
    number: '04',
    title: 'Mineralization',
    description: 'Essential minerals are added for optimal taste. Enjoy hot, cold, or ambient water on demand, 24/7.',
    color: '#0077C8',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
    ),
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#071A22] to-[#0a2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#00A99D] bg-[#00A99D]/10 rounded-full mb-4">Technology</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">
            How Atmospheric Water Generation Works
          </h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">
            Powered by Watergen's patented GENius™ technology. Four steps from air to clean, mineralized drinking water.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#0077C8]/20 to-transparent z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 2rem)' }} />
              )}

              <div className="relative p-6 bg-[#0d2a35] border border-[#0077C8]/10 rounded-2xl hover:border-[#0077C8]/25 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-3xl font-display font-bold" style={{ color: `${step.color}30` }}>{step.number}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#F7F9FB] mb-2">{step.title}</h3>
                <p className="text-sm text-[#F7F9FB]/50 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-[#F7F9FB]/30">
          GENius™ technology and related patents are the exclusive property of Watergen Ltd. Sovereign Water Technologies is an authorized distributor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
