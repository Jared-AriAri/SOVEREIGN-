import React, { useState, useMemo } from 'react';
import { products, generateWhatsAppLink } from '@/data/products';
import { submitLead } from '@/lib/leads';

interface PlannerProps {
  onAssessmentClick: () => void;
}

const communitySizes = [
  { value: 'household', label: 'Single Household', people: 4 },
  { value: '10-homes', label: '10 Homes', people: 40 },
  { value: '50-homes', label: '50 Homes', people: 200 },
  { value: '100-homes', label: '100 Homes', people: 400 },
  { value: 'clinic', label: 'Clinic', people: 30 },
  { value: 'school', label: 'School', people: 150 },
  { value: 'community-center', label: 'Community Center', people: 80 },
];

const waterNeeds = [
  { value: 5, label: '5 L/day per person', desc: 'Basic drinking water only' },
  { value: 20, label: '20 L/day per person', desc: 'Drinking + cooking + hygiene' },
  { value: 50, label: '50 L/day per person', desc: 'Full household use' },
];

const environments = [
  { value: 'arid', label: 'Arid', efficiency: 0.45, humidity: '15–30% RH', desc: 'Desert, very low humidity' },
  { value: 'semi-arid', label: 'Semi-Arid', efficiency: 0.70, humidity: '30–55% RH', desc: 'Moderate humidity, seasonal variation' },
  { value: 'humid', label: 'Humid', efficiency: 0.95, humidity: '55–90% RH', desc: 'High humidity, coastal or tropical' },
];

const WaterPlanner: React.FC<PlannerProps> = ({ onAssessmentClick }) => {
  const [step, setStep] = useState(1);
  const [community, setCommunity] = useState('');
  const [waterNeed, setWaterNeed] = useState(0);
  const [environment, setEnvironment] = useState('');
  const [electricityPrice, setElectricityPrice] = useState(0.12);
  const [planSaving, setPlanSaving] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [planContact, setPlanContact] = useState({ name: '', email: '', phone: '' });

  const selectedCommunity = communitySizes.find(c => c.value === community);
  const selectedEnv = environments.find(e => e.value === environment);

  const results = useMemo(() => {
    if (!selectedCommunity || !waterNeed || !selectedEnv) return null;

    const totalDailyNeed = selectedCommunity.people * waterNeed;
    const efficiency = selectedEnv.efficiency;

    const sortedProducts = [...products].sort((a, b) => b.capacityLitersDay - a.capacityLitersDay);
    const recommendations: { product: typeof products[0]; units: number; dailyProduction: number }[] = [];

    for (const product of sortedProducts) {
      const effectiveCapacity = Math.round(product.capacityLitersDay * efficiency);
      if (effectiveCapacity <= 0) continue;
      const unitsNeeded = Math.ceil(totalDailyNeed / effectiveCapacity);
      if (unitsNeeded > 0 && unitsNeeded <= 20) {
        recommendations.push({ product, units: unitsNeeded, dailyProduction: unitsNeeded * effectiveCapacity });
        break;
      }
    }

    if (totalDailyNeed > 100) {
      const midScale = products.find(p => p.capacityLitersDay >= 200 && p.capacityLitersDay <= 1000);
      if (midScale && !recommendations.find(r => r.product.id === midScale.id)) {
        const effectiveCap = Math.round(midScale.capacityLitersDay * efficiency);
        const units = Math.ceil(totalDailyNeed / effectiveCap);
        if (units <= 30) {
          recommendations.push({ product: midScale, units, dailyProduction: units * effectiveCap });
        }
      }
    }

    const primaryRec = recommendations[0];
    if (!primaryRec) return null;

    const dailyKwh = (primaryRec.product.powerConsumptionW / 1000) * 12 * primaryRec.units;
    const monthlyEnergyCost = dailyKwh * 30 * electricityPrice;
    const bottledWaterCostPerLiter = 0.50;
    const monthlyBottledCost = totalDailyNeed * 30 * bottledWaterCostPerLiter;
    const monthlySavings = monthlyBottledCost - monthlyEnergyCost;
    const co2Avoided = totalDailyNeed * 30 * 0.082;

    return {
      totalDailyNeed,
      recommendations,
      monthlyEnergyCost: Math.round(monthlyEnergyCost),
      monthlyBottledCost: Math.round(monthlyBottledCost),
      monthlySavings: Math.round(monthlySavings),
      co2Avoided: Math.round(co2Avoided),
      efficiency,
    };
  }, [selectedCommunity, waterNeed, selectedEnv, electricityPrice]);

  const buildPlanSummary = () => {
    if (!results || !selectedCommunity || !selectedEnv) return '';
    const rec = results.recommendations[0];
    return `Community: ${selectedCommunity.label} (~${selectedCommunity.people} people) | Daily Need: ${results.totalDailyNeed} L/day | Environment: ${selectedEnv.label} (${selectedEnv.humidity}) | Recommended: ${rec.units}x ${rec.product.model} | Est. Production: ${rec.dailyProduction} L/day | Monthly Energy: ~$${results.monthlyEnergyCost} | Monthly Savings vs Bottled: ~$${results.monthlySavings} | CO₂ Avoided: ~${results.co2Avoided} kg/month`;
  };

  const handleSavePlan = () => {
    setShowPlanForm(true);
  };

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results || !selectedCommunity || !selectedEnv) return;
    setPlanSaving(true);

    const planSummary = buildPlanSummary();

    await submitLead({
      name: planContact.name,
      email: planContact.email,
      phone: planContact.phone,
      community_size: community,
      plan_summary: planSummary,
      message: `Water Planner result — ${selectedCommunity.label}, ${selectedEnv.label} environment, ${waterNeed} L/person/day`,
      lead_type: 'water_planner',
    });

    const rec = results.recommendations[0];
    const msg = `Water Plan Summary from ${planContact.name}:\n\nCommunity: ${selectedCommunity.label} (~${selectedCommunity.people} people)\nDaily Need: ${results.totalDailyNeed} L/day\nEnvironment: ${selectedEnv.label} (${selectedEnv.humidity})\n\nRecommended: ${rec.units}x ${rec.product.model}\nEstimated Production: ${rec.dailyProduction} L/day\nMonthly Energy Cost: ~$${results.monthlyEnergyCost}\nMonthly Savings vs Bottled: ~$${results.monthlySavings}\nCO₂ Avoided: ~${results.co2Avoided} kg/month\n\nContact: ${planContact.email} | ${planContact.phone}\n\nI'd like to request a detailed assessment for this plan.`;
    window.open(generateWhatsAppLink(msg), '_blank');

    setPlanSaving(false);
    setPlanSaved(true);
    setShowPlanForm(false);
  };

  return (
    <section id="planner" className="relative py-16 md:py-24 bg-gradient-to-b from-[#071A22] via-[#0a2430] to-[#071A22]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0077C8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A99D]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#0077C8] bg-[#0077C8]/10 rounded-full mb-4">Interactive Tool</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">Community Water Planner</h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">Estimate your community's water needs and get personalized product recommendations. Three simple steps to water independence.</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <button onClick={() => { if (s < step || (s === 2 && community) || (s === 3 && community && waterNeed)) setStep(s); }} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? 'bg-[#0077C8] text-white shadow-lg shadow-[#0077C8]/30' : 'bg-[#0d2a35] text-[#F7F9FB]/30 border border-[#0077C8]/10'}`}>{s}</button>
              {s < 3 && <div className={`w-16 h-0.5 rounded-full transition-colors duration-300 ${step > s ? 'bg-[#0077C8]' : 'bg-[#0077C8]/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-[#0d2a35]/80 border border-[#0077C8]/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {step === 1 && (
            <div>
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-2">Step 1: Community Size</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-6">Select the size of your community or facility.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {communitySizes.map(cs => (
                  <button key={cs.value} onClick={() => { setCommunity(cs.value); setStep(2); }} className={`p-4 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${community === cs.value ? 'border-[#0077C8] bg-[#0077C8]/10 shadow-lg shadow-[#0077C8]/10' : 'border-[#0077C8]/10 hover:border-[#0077C8]/30 bg-[#071A22]/50'}`}>
                    <div className="font-semibold text-[#F7F9FB] mb-1">{cs.label}</div>
                    <div className="text-sm text-[#F7F9FB]/40">~{cs.people} people</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-2">Step 2: Daily Water Need</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-6">How much water per person per day?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {waterNeeds.map(wn => (
                  <button key={wn.value} onClick={() => { setWaterNeed(wn.value); setStep(3); }} className={`p-5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${waterNeed === wn.value ? 'border-[#00A99D] bg-[#00A99D]/10 shadow-lg shadow-[#00A99D]/10' : 'border-[#0077C8]/10 hover:border-[#00A99D]/30 bg-[#071A22]/50'}`}>
                    <div className="font-bold text-2xl text-[#00A99D] mb-1">{wn.value} L</div>
                    <div className="text-sm font-medium text-[#F7F9FB] mb-1">{wn.label}</div>
                    <div className="text-xs text-[#F7F9FB]/40">{wn.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-sm text-[#0077C8] hover:underline">Back to Step 1</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-2">Step 3: Environment</h3>
              <p className="text-sm text-[#F7F9FB]/50 mb-6">Select your climate zone — this affects AWG production efficiency.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {environments.map(env => (
                  <button key={env.value} onClick={() => setEnvironment(env.value)} className={`p-5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${environment === env.value ? 'border-[#2BA84A] bg-[#2BA84A]/10 shadow-lg shadow-[#2BA84A]/10' : 'border-[#0077C8]/10 hover:border-[#2BA84A]/30 bg-[#071A22]/50'}`}>
                    <div className="font-bold text-lg text-[#F7F9FB] mb-1">{env.label}</div>
                    <div className="text-sm text-[#2BA84A] font-medium mb-1">{env.humidity}</div>
                    <div className="text-xs text-[#F7F9FB]/40">{env.desc}</div>
                    <div className="mt-2 text-xs text-[#F7F9FB]/30">Efficiency: ~{Math.round(env.efficiency * 100)}%</div>
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <label className="block text-sm text-[#F7F9FB]/60 mb-2">Local electricity price ($/kWh): <span className="text-[#00A99D] font-semibold">${electricityPrice.toFixed(2)}</span></label>
                <input type="range" min="0.05" max="0.40" step="0.01" value={electricityPrice} onChange={e => setElectricityPrice(parseFloat(e.target.value))} className="w-full h-2 bg-[#071A22] rounded-lg appearance-none cursor-pointer accent-[#00A99D]" />
                <div className="flex justify-between text-xs text-[#F7F9FB]/30 mt-1"><span>$0.05</span><span>$0.40</span></div>
              </div>
              <button onClick={() => setStep(2)} className="text-sm text-[#0077C8] hover:underline">Back to Step 2</button>
            </div>
          )}
        </div>

        {results && environment && (
          <div className="mt-8 bg-gradient-to-b from-[#0d2a35] to-[#091f28] border border-[#2BA84A]/20 rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold text-[#F7F9FB] mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Your Water Plan
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-[#071A22]/50 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#0077C8]">{results.totalDailyNeed.toLocaleString()}</div>
                <div className="text-xs text-[#F7F9FB]/40 mt-1">L/day needed</div>
              </div>
              <div className="p-4 bg-[#071A22]/50 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#00A99D]">${results.monthlyEnergyCost}</div>
                <div className="text-xs text-[#F7F9FB]/40 mt-1">Est. monthly energy</div>
              </div>
              <div className="p-4 bg-[#071A22]/50 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#2BA84A]">${results.monthlySavings > 0 ? results.monthlySavings.toLocaleString() : '0'}</div>
                <div className="text-xs text-[#F7F9FB]/40 mt-1">Monthly savings vs bottled</div>
              </div>
              <div className="p-4 bg-[#071A22]/50 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#F7F9FB]">{results.co2Avoided.toLocaleString()} kg</div>
                <div className="text-xs text-[#F7F9FB]/40 mt-1">CO₂ avoided/month</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider">Recommended Configuration</h4>
              {results.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#071A22]/40 rounded-xl border border-[#0077C8]/10">
                  <img src={rec.product.image} alt={rec.product.model} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#F7F9FB]">{rec.units}x {rec.product.model}</div>
                    <div className="text-sm text-[#F7F9FB]/50">{rec.dailyProduction} L/day estimated production ({Math.round(results.efficiency * 100)}% efficiency)</div>
                    <div className="text-xs text-[#00A99D] mt-1">{rec.product.powerConsumptionW}W per unit | {rec.product.categoryLabel}</div>
                  </div>
                  {i === 0 && <span className="hidden sm:inline px-3 py-1 text-xs font-semibold bg-[#2BA84A]/20 text-[#2BA84A] rounded-full whitespace-nowrap">Best Match</span>}
                </div>
              ))}
            </div>

            {showPlanForm && !planSaved && (
              <form onSubmit={handlePlanSubmit} className="mb-6 p-5 bg-[#071A22]/60 rounded-xl border border-[#0077C8]/15 space-y-3">
                <h4 className="text-sm font-semibold text-[#F7F9FB]/80">Enter your contact details to save this plan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" required placeholder="Your name" value={planContact.name} onChange={e => setPlanContact(p => ({ ...p, name: e.target.value }))} className="px-4 py-2.5 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-sm text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none" />
                  <input type="email" required placeholder="Your email" value={planContact.email} onChange={e => setPlanContact(p => ({ ...p, email: e.target.value }))} className="px-4 py-2.5 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-sm text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none" />
                  <input type="tel" placeholder="Phone (optional)" value={planContact.phone} onChange={e => setPlanContact(p => ({ ...p, phone: e.target.value }))} className="px-4 py-2.5 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-sm text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] outline-none" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={planSaving} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#2BA84A] hover:bg-[#239E3F] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors">
                    {planSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                    {planSaving ? 'Saving...' : 'Save & Send via WhatsApp'}
                  </button>
                  <button type="button" onClick={() => setShowPlanForm(false)} className="px-5 py-3 border border-[#0077C8]/20 text-[#F7F9FB]/60 rounded-xl hover:bg-[#0077C8]/5 transition-colors">Cancel</button>
                </div>
              </form>
            )}

            {planSaved && (
              <div className="mb-6 p-4 bg-[#2BA84A]/10 border border-[#2BA84A]/20 rounded-xl flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-sm text-[#2BA84A]">Plan saved and sent via WhatsApp! Our team will follow up within 24 hours.</span>
              </div>
            )}

            {!showPlanForm && !planSaved && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleSavePlan} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#2BA84A] hover:bg-[#239E3F] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#2BA84A]/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Save Plan &amp; Request Assessment
                </button>
                <button onClick={onAssessmentClick} className="flex-1 px-6 py-4 border border-[#0077C8]/30 hover:bg-[#0077C8]/10 text-[#0077C8] font-medium rounded-xl transition-colors">Request Detailed Assessment</button>
              </div>
            )}

            <p className="mt-4 text-xs text-[#F7F9FB]/30 text-center">Estimates based on manufacturer specifications and environmental efficiency factors. Actual production varies by local conditions.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WaterPlanner;
