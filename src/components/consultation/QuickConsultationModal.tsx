import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { COMPANY_DETAILS } from '../../data/mockData';
import { Phone, CheckCircle2, Send, MapPin, Sparkles, Building2 } from 'lucide-react';

interface QuickConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultPackage
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [packageChoice, setPackageChoice] = useState(defaultPackage || 'Free Zone Company (100% Foreign Ownership)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSubmitted ? 'Consultation Request Sent' : 'Quick Consultation Now'}
      subtitle={isSubmitted ? 'An AnalyzeMarkets advisor will reach out to you.' : 'Send Consultation Request - AnalyzeMarkets FZE'}
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="text-center py-5 space-y-4 font-mono">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Consultation Request Received</h4>
            <p className="text-xs text-slate-500 dark:text-[#94a3b8]">
              Our business incorporation team at <span className="text-sky-500 font-bold">SRTI Park Sharjah</span> has received your details.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-[#182032] p-3.5 rounded-xl border border-slate-200 dark:border-[#1e293b] text-left text-xs space-y-1.5 shadow-sm">
            <div className="flex justify-between text-slate-500 dark:text-[#94a3b8]"><span>Contact Name:</span><span className="text-slate-900 dark:text-white font-bold">{name || 'Client'}</span></div>
            <div className="flex justify-between text-slate-500 dark:text-[#94a3b8]"><span>Phone Number:</span><span className="text-sky-600 dark:text-sky-400 font-bold">{phone}</span></div>
            <div className="flex justify-between text-slate-500 dark:text-[#94a3b8]"><span>Package:</span><span className="text-slate-800 dark:text-slate-200">{packageChoice}</span></div>
            <div className="flex justify-between text-slate-500 dark:text-[#94a3b8]"><span>Direct Hotline:</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">+971 56 339 6961</span></div>
          </div>

          <Button onClick={handleReset} variant="primary" size="sm" className="mx-auto text-xs font-mono shadow-sm">
            Back to Website
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-600 dark:text-[#94a3b8] block">
              Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-600 dark:text-[#94a3b8] block">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+971 50 123 4567"
              className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-600 dark:text-[#94a3b8] block">
              Package / Formation Type
            </label>
            <select
              value={packageChoice}
              onChange={e => setPackageChoice(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="Free Zone Company (100% Foreign Ownership)">Free Zone Company (Single / Multi-Shareholder)</option>
              <option value="Mainland LLC Company (Direct UAE Trading)">Mainland LLC Company (Direct UAE Market Trade)</option>
              <option value="Offshore & Holding Entity">Offshore & Holding Company</option>
              <option value="Management Consultancy & Market Entry">Management Consultancy & Research</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-600 dark:text-[#94a3b8] block">
              Message or Specific Activity (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. General Trading, E-commerce license with 2 investor visas..."
              className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-[#1e293b] flex items-center justify-between">
            <a
              href="tel:+971563396961"
              className="text-sky-600 dark:text-sky-400 hover:underline text-[11px] flex items-center gap-1 font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>+971 56 339 6961</span>
            </a>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              className="font-mono text-xs shadow-md"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>Send Request</span>
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
