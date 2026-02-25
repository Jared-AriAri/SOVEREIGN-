import React from 'react';

const HERO_BG = 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454912036_6b88d5b8.jpg';

interface HeroProps {
  onAssessmentClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAssessmentClick }) => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A22]/95 via-[#071A22]/80 to-[#0077C8]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A22] via-transparent to-[#071A22]/30" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00A99D]/20 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077C8]/15 border border-[#0077C8]/30 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00A99D] animate-pulse" />
            <span className="text-sm text-[#00A99D] font-medium">Atmospheric Water Generation for Tribal Nations</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F9FB] leading-[1.1] mb-6">
            Water Independence{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077C8] via-[#00A99D] to-[#2BA84A]">
              for Tribal Communities.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#F7F9FB]/75 leading-relaxed mb-10 max-w-2xl">
            High-quality drinking water, generated from the air. Deployable at household, community, and municipal scale. Designed in partnership with Tribal Nations for resilience and autonomy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onAssessmentClick}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#2BA84A] hover:bg-[#239E3F] text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-xl shadow-[#2BA84A]/25 hover:shadow-[#2BA84A]/50 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Request an Assessment
            </button>

            <button
              onClick={scrollToProducts}
              className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#0077C8]/50 hover:border-[#0077C8] text-[#F7F9FB] hover:bg-[#0077C8]/10 font-semibold text-lg rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </button>
          </div>

          <p className="mt-8 text-sm text-[#F7F9FB]/40 italic max-w-xl">
            "We work in partnership with Tribal Nations — projects designed with cultural respect and community consent."
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-[#F7F9FB]/40 tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7F9FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  );
};

export default Hero;
