import React, { useState } from "react";
import { DATA_SOURCES, CONTACT_EMAIL, generateWhatsAppLink, generateEmailLink } from "@/data/products";
import { submitLead } from "@/lib/leads";

const LOGO_URL =
  "https://d64gsuwffb70l.cloudfront.net/68d82ecec06a0a8f0b4bc68f_1771454657314_d03341a6.jpeg";

interface FooterProps {
  onAssessmentClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAssessmentClick }) => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactSaving, setContactSaving] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSaving(true);

    await submitLead({
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      lead_type: "contact",
    });

    const emailUrl = generateEmailLink(
      `Contact from ${contactForm.name}`,
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
    );

    window.location.href = emailUrl;

    setContactSaving(false);
    setContactSent(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id="contact" className="relative bg-[#051218] border-t border-[#0077C8]/10">
      <div className="bg-gradient-to-r from-[#0077C8]/20 via-[#00A99D]/10 to-[#2BA84A]/20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">
            Ready to Bring Water Independence to Your Community?
          </h2>
          <p className="text-[#F7F9FB]/60 mb-8 max-w-2xl mx-auto">
            Start with a free water assessment. Our team will evaluate your community's needs and recommend the optimal solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onAssessmentClick}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#2BA84A] hover:bg-[#239E3F] text-white font-semibold text-lg rounded-full transition-all duration-200 shadow-xl shadow-[#2BA84A]/20"
            >
              Request Assessment — WhatsApp
            </button>
            <a
              href="tel:+12146007494"
              className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#0077C8]/40 hover:border-[#0077C8] text-[#F7F9FB] font-semibold text-lg rounded-full transition-all duration-200"
            >
              Call +1 (214) 600-7494
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Sovereign Water Technologies" className="h-10 w-auto rounded-lg" />
              <div>
                <span className="font-display text-sm font-bold text-[#F7F9FB] block">
                  Sovereign Water
                </span>
                <span className="text-[10px] text-[#00A99D] font-medium tracking-wider uppercase">
                  Technologies
                </span>
              </div>
            </div>
            <p className="text-sm text-[#F7F9FB]/40 leading-relaxed mb-4">
              Atmospheric water generation solutions adapted for Tribal Nations. Water independence through partnership, autonomy, and resilience.
            </p>
            <p className="text-xs text-[#F7F9FB]/25 italic">
              Powered by Watergen GENius™ technology. Technology and patents are property of Watergen Ltd.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Products", id: "products" },
                { label: "Water Planner", id: "planner" },
                { label: "Partnership", id: "partnership" },
                { label: "Why AWG", id: "case-for-action" },
                { label: "FAQ", id: "faq" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-[#F7F9FB]/40 hover:text-[#00A99D] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12146007494"
                  className="text-sm text-[#F7F9FB]/40 hover:text-[#00A99D] transition-colors"
                >
                  +1 (214) 600-7494
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-[#F7F9FB]/40 hover:text-[#00A99D] transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppLink("Hello, I have a question about Sovereign Water Technologies.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#F7F9FB]/40 hover:text-[#2BA84A] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-4">
              Quick Message
            </h4>
            {!contactSent ? (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[#071A22] border border-[#0077C8]/10 rounded-lg text-[#F7F9FB] placeholder-[#F7F9FB]/20 focus:border-[#00A99D] outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[#071A22] border border-[#0077C8]/10 rounded-lg text-[#F7F9FB] placeholder-[#F7F9FB]/20 focus:border-[#00A99D] outline-none"
                />
                <textarea
                  placeholder="Your message"
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[#071A22] border border-[#0077C8]/10 rounded-lg text-[#F7F9FB] placeholder-[#F7F9FB]/20 focus:border-[#00A99D] outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={contactSaving}
                  className="w-full px-4 py-2 text-sm font-medium bg-[#0077C8] hover:bg-[#0066b0] disabled:opacity-60 text-white rounded-lg transition-colors"
                >
                  {contactSaving ? "Saving..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#2BA84A]/10 border border-[#2BA84A]/20 rounded-lg text-center">
                <p className="text-sm text-[#2BA84A]">
                  Message saved & sent! We'll respond within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#0077C8]/5">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {DATA_SOURCES.map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F7F9FB]/25 hover:text-[#00A99D] transition-colors underline underline-offset-2"
              >
                {src.title}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-[#F7F9FB]/20">
            &copy; {new Date().getFullYear()} Sovereign Water Technologies. All rights reserved. Powered by Watergen GENius™ technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;