import React, { useState } from 'react';
import { generateWhatsAppLink } from '@/data/products';
import { submitLead } from '@/lib/leads';

interface PartnerSectionProps {
  onAssessmentClick: () => void;
}

const tiers = [
  { name: 'Community Partner', description: 'For tribal councils and community organizations deploying AWG for their members.', features: ['Priority pricing on all models', 'Dedicated project manager', 'Community water assessment included', 'Grant application support', 'Installation and training', 'Ongoing technical support'], cta: 'Partner Inquiry', accent: '#0077C8' },
  { name: 'Tribal Enterprise', description: 'For tribal businesses providing water services to multiple communities or facilities.', features: ['Everything in Community Partner', 'Volume procurement discounts', 'Multi-site deployment planning', 'Revenue sharing models', 'Marketing and outreach support', 'Quarterly business reviews'], cta: 'Enterprise Inquiry', accent: '#00A99D', featured: true },
  { name: 'Government & NGO', description: 'For tribal governments, federal programs, and non-profits funding water infrastructure.', features: ['Everything in Tribal Enterprise', 'Federal grant compliance support', 'EPA and IHS coordination', 'Large-scale deployment planning', 'Impact reporting and metrics', 'Dedicated account team'], cta: 'Government Inquiry', accent: '#2BA84A' },
];

const PartnerSection: React.FC<PartnerSectionProps> = ({ onAssessmentClick }) => {
  const [resalePrice, setResalePrice] = useState(30);
  const [accounts, setAccounts] = useState(50);
  const [inquiryTier, setInquiryTier] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', organization: '' });
  const [inquirySaving, setInquirySaving] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const monthlyRevenue = resalePrice * accounts;
  const annualRevenue = monthlyRevenue * 12;

  const handlePartnerInquiry = (tierName: string) => {
    setInquiryTier(tierName);
    setInquirySent(false);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryTier) return;
    setInquirySaving(true);

    await submitLead({
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      organization: inquiryForm.organization,
      message: `Partner inquiry for ${inquiryTier} tier`,
      lead_type: 'partner_inquiry',
    });

    const msg = `Hello, I'm ${inquiryForm.name} from ${inquiryForm.organization || 'my organization'}.\n\nI'm interested in the ${inquiryTier} partnership tier for Sovereign Water Technologies.\n\nEmail: ${inquiryForm.email}\nPhone: ${inquiryForm.phone}\n\nI'd like to learn more about procurement options and partnership details.`;
    window.open(generateWhatsAppLink(msg), '_blank');

    setInquirySaving(false);
    setInquirySent(true);
    setInquiryTier(null);
    setInquiryForm({ name: '', email: '', phone: '', organization: '' });
  };

  return (
    <section id="partnership" className="relative py-16 md:py-24 bg-[#071A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#2BA84A] bg-[#2BA84A]/10 rounded-full mb-4">Partnership</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">Build Water Independence Together</h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">Partner with Sovereign Water Technologies to bring atmospheric water generation to your community. We provide procurement support, grant guidance, and end-to-end deployment.</p>
        </div>

        {/* Inquiry Form Modal */}
        {inquiryTier && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" onClick={() => setInquiryTier(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-md bg-[#0d2a35] border border-[#0077C8]/30 rounded-2xl shadow-2xl p-6 md:p-8" onClick={e => e.stopPropagation()}>
              <button onClick={() => setInquiryTier(null)} className="absolute top-4 right-4 text-[#F7F9FB]/60 hover:text-[#F7F9FB]" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-1">{inquiryTier} Inquiry</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-5">Enter your details and we'll connect via WhatsApp.</p>
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <input type="text" required placeholder="Your name" value={inquiryForm.name} onChange={e => setInquiryForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none text-sm" />
                <input type="email" required placeholder="Email address" value={inquiryForm.email} onChange={e => setInquiryForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none text-sm" />
                <input type="tel" placeholder="Phone (optional)" value={inquiryForm.phone} onChange={e => setInquiryForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none text-sm" />
                <input type="text" placeholder="Organization / Tribal Nation" value={inquiryForm.organization} onChange={e => setInquiryForm(p => ({ ...p, organization: e.target.value }))} className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none text-sm" />
                <button type="submit" disabled={inquirySaving} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2BA84A] hover:bg-[#239E3F] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors">
                  {inquirySaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                  {inquirySaving ? 'Sending...' : 'Send via WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        )}

        {inquirySent && (
          <div className="mb-8 p-4 bg-[#2BA84A]/10 border border-[#2BA84A]/20 rounded-xl flex items-center gap-3 justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-sm text-[#2BA84A]">Partner inquiry saved and sent! We'll be in touch within 24 hours.</span>
          </div>
        )}

        {/* Partnership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${tier.featured ? 'bg-gradient-to-b from-[#0d2a35] to-[#091f28] border-[#00A99D]/40 shadow-xl shadow-[#00A99D]/5' : 'bg-[#0d2a35] border-[#0077C8]/10 hover:border-[#0077C8]/30'}`}>
              {tier.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-[#00A99D] text-white rounded-full">Recommended</div>}
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-2">{tier.name}</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#F7F9FB]/65">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handlePartnerInquiry(tier.name)} className={`w-full py-3 text-sm font-semibold rounded-xl transition-colors ${tier.featured ? 'bg-[#00A99D] hover:bg-[#009688] text-white' : ''}`} style={!tier.featured ? { borderWidth: '1px', borderStyle: 'solid', borderColor: `${tier.accent}40`, color: tier.accent } : {}}>{tier.cta}</button>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-[#0d2a35] to-[#0a2430] border border-[#0077C8]/10 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F7F9FB] mb-2">ROI Calculator</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-6">Estimate potential revenue from providing water services to your community.</p>
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm text-[#F7F9FB]/60 mb-2"><span>Monthly service fee per household</span><span className="text-[#00A99D] font-semibold">${resalePrice}</span></label>
                  <input type="range" min="10" max="100" step="5" value={resalePrice} onChange={e => setResalePrice(parseInt(e.target.value))} className="w-full h-2 bg-[#071A22] rounded-lg appearance-none cursor-pointer accent-[#00A99D]" />
                  <div className="flex justify-between text-xs text-[#F7F9FB]/30 mt-1"><span>$10</span><span>$100</span></div>
                </div>
                <div>
                  <label className="flex justify-between text-sm text-[#F7F9FB]/60 mb-2"><span>Number of households served</span><span className="text-[#0077C8] font-semibold">{accounts}</span></label>
                  <input type="range" min="10" max="500" step="10" value={accounts} onChange={e => setAccounts(parseInt(e.target.value))} className="w-full h-2 bg-[#071A22] rounded-lg appearance-none cursor-pointer accent-[#0077C8]" />
                  <div className="flex justify-between text-xs text-[#F7F9FB]/30 mt-1"><span>10</span><span>500</span></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#071A22]/50 rounded-xl text-center"><div className="text-3xl font-bold text-[#00A99D]">${monthlyRevenue.toLocaleString()}</div><div className="text-xs text-[#F7F9FB]/40 mt-1">Monthly Revenue</div></div>
              <div className="p-5 bg-[#071A22]/50 rounded-xl text-center"><div className="text-3xl font-bold text-[#2BA84A]">${annualRevenue.toLocaleString()}</div><div className="text-xs text-[#F7F9FB]/40 mt-1">Annual Revenue</div></div>
              <div className="col-span-2 p-5 bg-[#071A22]/50 rounded-xl text-center"><div className="text-lg font-bold text-[#F7F9FB]">{accounts} households</div><div className="text-xs text-[#F7F9FB]/40 mt-1">with clean water access — building community resilience</div></div>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => handlePartnerInquiry('Tribal Enterprise')} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#2BA84A] hover:bg-[#239E3F] text-white font-semibold rounded-xl transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Partner Inquiry — WhatsApp
            </button>
            <button onClick={onAssessmentClick} className="flex-1 px-6 py-3 border border-[#0077C8]/30 hover:bg-[#0077C8]/10 text-[#0077C8] font-medium rounded-xl transition-colors">Request Community Assessment</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
