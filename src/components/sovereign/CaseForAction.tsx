import React from 'react';
import { DATA_SOURCES } from '@/data/products';

const COMMUNITY_IMG = 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454932721_eaf20d1d.jpg';
const WATER_IMG = 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454977419_45feb366.jpg';

const challenges = [
  {
    stat: '2.2 Million',
    label: 'Americans lack access to clean running water or basic indoor plumbing.',
    source: 'DigDeep / US Water Alliance, 2019',
    sourceUrl: 'https://www.digdeep.org/close-the-water-gap',
  },
  {
    stat: '~30%',
    label: 'of Navajo Nation households haul water for daily use — often traveling 30+ miles round trip.',
    source: 'Navajo Water Project',
    sourceUrl: 'https://www.navajowaterproject.org/',
  },
  {
    stat: '58×',
    label: 'Native American households are more likely to lack indoor plumbing than white households.',
    source: 'DigDeep, Closing the Water Access Gap',
    sourceUrl: 'https://www.digdeep.org/close-the-water-gap',
  },
  {
    stat: '$1,500+',
    label: 'Average annual cost per household for bottled water in communities without reliable tap water.',
    source: 'US Water Alliance',
    sourceUrl: 'https://uswateralliance.org/resources/an-equitable-water-future/',
  },
];

const benefits = [
  {
    title: 'No Infrastructure Required',
    desc: 'AWG units operate independently — no pipes, no wells, no municipal connection needed.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
  },
  {
    title: 'Rapid Deployment',
    desc: 'From assessment to operational water production in weeks, not years. No construction delays.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
  },
  {
    title: 'Low Operational Complexity',
    desc: 'Simple maintenance — filter replacements and basic cleaning. Community members can be trained in hours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
  },
  {
    title: 'Solar-Ready',
    desc: 'Compatible with solar power systems for complete energy independence in off-grid locations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    ),
  },
  {
    title: 'Community Sovereignty',
    desc: 'Own your water source. No dependency on external supply chains, deliveries, or municipal systems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
  },
  {
    title: 'Multi-Stage Purification',
    desc: 'Advanced filtration, UV treatment, and mineralization produce clean, great-tasting drinking water.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    ),
  },
];

const CaseForAction: React.FC = () => {
  return (
    <section id="case-for-action" className="relative py-16 md:py-24 bg-gradient-to-b from-[#071A22] via-[#0a2430] to-[#071A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#0077C8] bg-[#0077C8]/10 rounded-full mb-4">Why AWG</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">
            The Case for Water Independence
          </h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">
            Millions of Americans — disproportionately in tribal communities — still lack reliable access to clean drinking water. Atmospheric water generation offers a path to sovereignty.
          </p>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="relative rounded-2xl overflow-hidden h-full min-h-[300px]">
            <img src={COMMUNITY_IMG} alt="Rural community landscape" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A22] via-[#071A22]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-2xl font-bold text-[#F7F9FB] mb-2">The Challenge</h3>
              <p className="text-sm text-[#F7F9FB]/60">
                Water access disparities in the United States disproportionately affect tribal communities. Traditional infrastructure solutions can take decades and cost millions. Communities need solutions now.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {challenges.map((ch, i) => (
              <div key={i} className="p-5 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl hover:border-[#0077C8]/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="font-display text-2xl md:text-3xl font-bold text-[#0077C8] min-w-[80px]">{ch.stat}</div>
                  <div>
                    <p className="text-sm text-[#F7F9FB]/70 leading-relaxed">{ch.label}</p>
                    <a
                      href={ch.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-[#00A99D]/60 hover:text-[#00A99D] underline underline-offset-2 transition-colors"
                    >
                      Source: {ch.source}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Benefits */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={WATER_IMG} alt="Clean water" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F7F9FB]">The Solution: Atmospheric Water Generation</h3>
              <p className="text-sm text-[#F7F9FB]/50 mt-1">Clean drinking water from air humidity — deployed in weeks, maintained by the community.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="group p-5 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl hover:border-[#0077C8]/20 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-lg bg-[#071A22] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h4 className="font-semibold text-[#F7F9FB] mb-1">{b.title}</h4>
                <p className="text-sm text-[#F7F9FB]/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="p-5 bg-[#0d2a35]/50 border border-[#0077C8]/5 rounded-xl">
          <h4 className="text-xs font-semibold text-[#F7F9FB]/40 uppercase tracking-wider mb-3">Data Sources</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DATA_SOURCES.map(src => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-[#071A22]/50 rounded-lg hover:bg-[#071A22] transition-colors group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <div>
                  <div className="text-xs font-medium text-[#F7F9FB]/70 group-hover:text-[#00A99D] transition-colors">{src.name}</div>
                  <div className="text-[10px] text-[#F7F9FB]/30 line-clamp-1">{src.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseForAction;
