import React, { useState } from 'react';

const faqItems = [
  {
    question: 'How does atmospheric water generation work?',
    answer: 'AWG systems draw in ambient air, cool it to the dew point to extract moisture, then purify the condensed water through multi-stage filtration, UV treatment, and mineralization. The result is clean, great-tasting drinking water — produced entirely from air humidity. No plumbing, wells, or municipal connection required.',
  },
  {
    question: 'How much water can a single unit produce?',
    answer: 'Production depends on the model and local humidity/temperature. The GENNY+ (residential) produces up to 20 L/day. The GEN-M1 (mid-scale) produces up to 220 L/day. The GEN-M Pro (commercial) produces up to 900 L/day. The GEN-L (industrial) produces up to 6,000 L/day. Actual output varies with environmental conditions — our assessment process provides site-specific projections.',
  },
  {
    question: 'Does AWG work in dry/arid climates?',
    answer: 'AWG systems require some level of air humidity to operate. In very arid conditions (below 20% RH), production decreases significantly. However, many tribal lands in the Southwest experience seasonal humidity variations, and even semi-arid environments (30–55% RH) support meaningful water production. Our climate assessment evaluates your specific location to recommend the right system and set realistic expectations.',
  },
  {
    question: 'What are the energy requirements?',
    answer: 'Energy consumption varies by model: GENNY+ uses approximately 500W (similar to a small refrigerator), while industrial units like the GEN-L require approximately 52 kW. All units are compatible with solar power systems, making them suitable for off-grid deployment. Energy efficiency ranges from 0.23 to 0.7 kWh per liter depending on the model.',
  },
  {
    question: 'What maintenance is required?',
    answer: 'Maintenance is straightforward: periodic filter replacements (typically every 6–12 months) and basic cleaning. Annual filter costs for the GENNY+ are approximately $200–300. Larger units have proportionally higher maintenance costs but lower per-liter costs. Community members can be trained to perform routine maintenance in a few hours.',
  },
  {
    question: 'Is the water safe to drink?',
    answer: 'Yes. Watergen systems use multi-stage filtration and UV treatment processes designed to produce clean drinking water that meets or exceeds EPA drinking water standards. The water is also mineralized for optimal taste. For best results, follow the recommended maintenance schedule and replace filters as advised.',
  },
  {
    question: 'What funding options are available for tribal communities?',
    answer: 'Several federal programs support water infrastructure for tribal nations, including EPA Tribal Water Infrastructure grants, IHS (Indian Health Service) sanitation facilities programs, USDA Rural Development Water & Waste Disposal grants, and BIA (Bureau of Indian Affairs) infrastructure funding. Our team provides grant application support and can help identify the best funding pathways for your community.',
  },
  {
    question: 'How long does deployment take?',
    answer: 'From initial assessment to operational water production, typical timelines are: Residential (GENNY+): 1–2 weeks. Mid-scale (GEN-M1): 2–4 weeks. Commercial (GEN-M Pro): 4–6 weeks. Industrial (GEN-L): 6–10 weeks. These timelines include site assessment, procurement, delivery, installation, and community training.',
  },
  {
    question: 'Can multiple units be combined for larger communities?',
    answer: 'Yes. All models are designed for scalable deployment. Multiple units can be deployed across a community to meet total water demand. For example, a community of 100 homes might use a combination of GEN-M Pro and GEN-M1 units distributed at key locations. Our Water Planner tool above can help estimate the right configuration.',
  },
];

const deploymentSteps = [
  {
    step: '01',
    title: 'Assessment',
    desc: 'Climate analysis, community needs evaluation, and site survey to determine optimal system configuration.',
    duration: '1–2 weeks',
  },
  {
    step: '02',
    title: 'Pilot',
    desc: 'Deploy a pilot unit to validate production estimates and demonstrate water quality to community leaders.',
    duration: '2–4 weeks',
  },
  {
    step: '03',
    title: 'Install',
    desc: 'Full deployment of recommended systems with professional installation and infrastructure setup.',
    duration: '2–6 weeks',
  },
  {
    step: '04',
    title: 'Training',
    desc: 'Hands-on training for community members on operation, maintenance, and water quality monitoring.',
    duration: '1 week',
  },
  {
    step: '05',
    title: 'Support',
    desc: 'Ongoing technical support, remote monitoring, and scheduled maintenance visits.',
    duration: 'Continuous',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-24 bg-[#071A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#00A99D] bg-[#00A99D]/10 rounded-full mb-4">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                    openIndex === i ? 'border-[#0077C8]/30 bg-[#0d2a35]' : 'border-[#0077C8]/10 bg-[#0d2a35]/50'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-sm font-medium text-[#F7F9FB]/85 pr-4">{item.question}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0077C8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-[#F7F9FB]/55 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Guide */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#2BA84A] bg-[#2BA84A]/10 rounded-full mb-4">Deployment</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-8">
              Deployment Process
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077C8] via-[#00A99D] to-[#2BA84A]" />

              <div className="space-y-6">
                {deploymentSteps.map((step, i) => (
                  <div key={i} className="relative flex gap-5 pl-2">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#0d2a35] border-2 border-[#0077C8] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#0077C8]">{step.step}</span>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-[#F7F9FB]">{step.title}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-medium text-[#00A99D] bg-[#00A99D]/10 rounded-full">{step.duration}</span>
                      </div>
                      <p className="text-sm text-[#F7F9FB]/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
