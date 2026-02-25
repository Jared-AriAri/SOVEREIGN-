import React, { useState } from 'react';
import { generateWhatsAppLink, generateEmailLink, CONTACT_EMAIL } from '@/data/products';
import { submitLead } from '@/lib/leads';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillMessage?: string;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, prefillMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    communitySize: '',
    message: prefillMessage || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dbError, setDbError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setDbError('');

    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      community_size: formData.communitySize,
      message: formData.message,
      lead_type: 'assessment',
    });

    if (!result.success) {
      setDbError(result.error || 'Failed to save. Your WhatsApp message will still be sent.');
    }

    const whatsappMsg = `Hello, I'm ${formData.name} from ${formData.organization || 'my community'}.\n\nI'd like to request a water assessment.\n\nCommunity Size: ${formData.communitySize}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
    const whatsappUrl = generateWhatsAppLink(whatsappMsg);
    window.open(whatsappUrl, '_blank');

    const emailUrl = generateEmailLink(
      `Water Assessment Request — ${formData.organization || formData.name}`,
      `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCommunity Size: ${formData.communitySize}\n\n${formData.message}`
    );
    window.location.href = emailUrl;

    setSaving(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-[#0d2a35] border border-[#0077C8]/30 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F7F9FB]/60 hover:text-[#F7F9FB] transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-[#F7F9FB] mb-2">Request a Water Assessment</h2>
                <p className="text-[#F7F9FB]/70 text-sm">Complete this form and we'll connect with you via WhatsApp for a personalized consultation. No obligation.</p>
              </div>

              {dbError && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400">
                  {dbError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Organization / Tribal Nation</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors"
                    placeholder="Tribal council, organization, or community name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Community Size</label>
                  <select
                    name="communitySize"
                    value={formData.communitySize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors"
                  >
                    <option value="">Select community size</option>
                    <option value="household">Single Household (1–6 people)</option>
                    <option value="10-homes">Small Community (~10 homes)</option>
                    <option value="50-homes">Medium Community (~50 homes)</option>
                    <option value="100-homes">Large Community (~100 homes)</option>
                    <option value="clinic">Clinic or Health Center</option>
                    <option value="school">School</option>
                    <option value="community-center">Community Center</option>
                    <option value="municipal">Municipal / Tribal Government</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F7F9FB]/80 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#071A22] border border-[#0077C8]/20 rounded-xl text-[#F7F9FB] placeholder-[#F7F9FB]/30 focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] outline-none transition-colors resize-none"
                    placeholder="Tell us about your water needs, location, or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#2BA84A] hover:bg-[#239E3F] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#2BA84A]/20 hover:shadow-[#2BA84A]/40"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  )}
                  {saving ? 'Saving & Sending...' : 'Send via WhatsApp'}
                </button>

                <p className="text-xs text-[#F7F9FB]/40 text-center">
                  Your information is saved securely and also sent to {CONTACT_EMAIL} for follow-up.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2BA84A]/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2BA84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-2">Assessment Requested</h3>
              <p className="text-[#F7F9FB]/70 mb-6">Your request has been saved and sent via WhatsApp. Our team will respond within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', organization: '', communitySize: '', message: '' }); onClose(); }}
                className="px-6 py-3 bg-[#0077C8] hover:bg-[#0066b0] text-white rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
