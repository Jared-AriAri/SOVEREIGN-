import React, { useState } from 'react';
import Navbar from '@/components/sovereign/Navbar';
import Hero from '@/components/sovereign/Hero';
import ImpactCards from '@/components/sovereign/ImpactCards';
import HowItWorks from '@/components/sovereign/HowItWorks';
import ProductCatalog from '@/components/sovereign/ProductCatalog';
import WaterPlanner from '@/components/sovereign/WaterPlanner';
import PartnerSection from '@/components/sovereign/PartnerSection';
import CaseForAction from '@/components/sovereign/CaseForAction';
import FAQ from '@/components/sovereign/FAQ';
import Footer from '@/components/sovereign/Footer';
import WhatsAppButton from '@/components/sovereign/WhatsAppButton';
import AssessmentModal from '@/components/sovereign/AssessmentModal';

const AppLayout: React.FC = () => {
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#071A22] text-[#F7F9FB] font-sans">
      <Navbar onAssessmentClick={() => setAssessmentOpen(true)} />
      <Hero onAssessmentClick={() => setAssessmentOpen(true)} />
      <ImpactCards />
      <HowItWorks />
      <ProductCatalog onAssessmentClick={() => setAssessmentOpen(true)} />
      <WaterPlanner onAssessmentClick={() => setAssessmentOpen(true)} />
      <CaseForAction />
      <PartnerSection onAssessmentClick={() => setAssessmentOpen(true)} />
      <FAQ />
      <Footer onAssessmentClick={() => setAssessmentOpen(true)} />
      <WhatsAppButton />
      <AssessmentModal isOpen={assessmentOpen} onClose={() => setAssessmentOpen(false)} />
    </div>
  );
};

export default AppLayout;
