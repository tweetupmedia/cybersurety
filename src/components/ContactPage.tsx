import React, { useState } from 'react';
import { 
  Shield, 
  Send, 
  PhoneCall, 
  Mail, 
  Building, 
  User, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  MapPin, 
  Key, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Bot
} from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactPageProps {
  onOpenLiveChat: () => void;
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenLiveChat,
  onNavigateHome,
  onOpenAuditModal,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    inquiryType: 'Threat Monitoring & SOC Deployment',
    urgency: 'normal',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    ticketId: string;
    submittedAt: string;
  } | null>(null);

  // Business hours calculation for EST (Mon-Fri 8am-6pm)
  const getBusinessHoursStatus = () => {
    const now = new Date();
    const estFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      hour12: false,
    });
    const parts = estFormatter.formatToParts(now);
    let weekday = '';
    let hour = 12;
    for (const p of parts) {
      if (p.type === 'weekday') weekday = p.value;
      if (p.type === 'hour') hour = parseInt(p.value, 10);
    }
    const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
    const isHour = hour >= 8 && hour < 18;
    const isOnline = isWeekday && isHour;

    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      isOnline,
      timeString: `${timeString} EST`,
      day: weekday,
    };
  };

  const bhStatus = getBusinessHoursStatus();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) errors.company = 'Company / organization name is required';
    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your security or compliance inquiry';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Please provide at least 15 characters describing your requirements';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `SEC-CT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionSuccess({
        ticketId,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 1100);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      inquiryType: 'Threat Monitoring & SOC Deployment',
      urgency: 'normal',
      phone: '',
    });
    setSubmissionSuccess(null);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={onNavigateHome}
            className="hover:text-cyan-400 transition-colors"
          >
            CyberSurety
          </button>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Contact Us & SOC Command</span>
        </div>

        {/* Header Hero */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
                <Shield className="h-3.5 w-3.5" />
                <span>DIRECT SEC-OPS & ENTERPRISE COMMUNICATIONS</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CyberSurety</span>
              </h1>
              <p className="mt-2 max-w-2xl text-base text-slate-300">
                Connect with our certified incident commanders, threat researchers, and GRC architects. 
                Immediate assistance is available via Live Chat during business hours and 24/7 via our emergency response hotline.
              </p>
            </div>

            {/* SLA Badges */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-left">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Critical Threat SLA</span>
                <span className="text-lg font-bold text-rose-400 font-mono">&lt; 15 Minutes</span>
                <span className="text-[10px] text-slate-500 block">24/7 Air-gapped SOC dispatch</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-left">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Standard Enterprise SLA</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">&lt; 2 Hours</span>
                <span className="text-[10px] text-slate-500 block">Business hours technical review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Form (Left) & Live Chat / Operations (Right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-[#080c14]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span>Send an Enterprise Security Inquiry</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  All communications are encrypted with TLS 1.3 and routed directly to our Austin and Frankfurt operations centers.
                </p>
              </div>

              {submissionSuccess ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center animate-fadeIn">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Inquiry Dispatched to SecOps Command</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                    Your request has been cryptographically cataloged. A designated Lead Security Engineer or GRC Architect will respond according to your priority level.
                  </p>
                  
                  <div className="mx-auto max-w-xs rounded-xl bg-[#05080f] border border-slate-800 p-3 text-left font-mono text-xs space-y-1 mb-6">
                    <div className="flex justify-between text-slate-400">
                      <span>Ticket Reference:</span>
                      <strong className="text-cyan-400">{submissionSuccess.ticketId}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Logged Timestamp:</span>
                      <span className="text-slate-200">{submissionSuccess.submittedAt}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Assigned Pod:</span>
                      <span className="text-slate-200">Austin SOC Tier-2</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={onOpenLiveChat}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Follow-up in Live Chat</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jordan Vance"
                        className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          formErrors.name 
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-[11px] text-rose-400 font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Corporate Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jordan@enterprise.com"
                        className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          formErrors.email 
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-400 font-mono">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Company / Organization *</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Financial Technologies"
                        className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          formErrors.company 
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                      />
                      {formErrors.company && (
                        <p className="mt-1 text-[11px] text-rose-400 font-mono">{formErrors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <PhoneCall className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Direct Phone (Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Service Area of Interest */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Primary Cyber Surety Focus Area
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="Threat Monitoring & SOC Deployment">Threat Monitoring (24/7 SOC & eBPF Telemetry)</option>
                      <option value="Risk Assessment & FAIR Model">Risk Assessment & FAIR Exposure Modeling</option>
                      <option value="Compliance Management (ISO/SOC2/HIPAA)">Compliance Management (Continuous Multi-Framework GRC)</option>
                      <option value="Incident Response & Autonomous SOAR">Incident Response & Sub-300ms SOAR Playbooks</option>
                      <option value="Active Incident Emergency Triage">EMERGENCY: Suspected Active Intrusion / Breach</option>
                      <option value="General Enterprise Demo & Partnership">General Enterprise Demo & Partnership</option>
                    </select>
                  </div>

                  {/* Urgency Radio Indicator */}
                  <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Routing Urgency Level:
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="urgency"
                          value="normal"
                          checked={formData.urgency === 'normal'}
                          onChange={() => setFormData({ ...formData, urgency: 'normal' })}
                          className="text-cyan-500 focus:ring-cyan-400"
                        />
                        <span>Standard Evaluation (&lt; 2h SLA)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-rose-400 font-semibold">
                        <input
                          type="radio"
                          name="urgency"
                          value="urgent_threat"
                          checked={formData.urgency === 'urgent_threat'}
                          onChange={() => setFormData({ ...formData, urgency: 'urgent_threat' })}
                          className="text-rose-500 focus:ring-rose-400"
                        />
                        <span>Critical Threat / Breach Alert (&lt; 15m SLA)</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Message & Technical Requirements *
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline your asset scope (cloud accounts, endpoints), compliance frameworks (e.g. ISO 27001, SOC 2), or specific threat containment objectives..."
                      className={`w-full rounded-xl border bg-slate-900/80 p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                        formErrors.message 
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                          : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-[11px] text-rose-400 font-mono">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Encrypting & Routing to Austin SOC...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Security Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Live Chat Integration & Emergency Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Chat Feature Card */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 to-[#080c14] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <MessageSquare className="h-32 w-32 text-cyan-400" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${bhStatus.isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className={`relative inline-flex h-3 w-3 rounded-full ${bhStatus.isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    {bhStatus.isOnline ? 'Live Chat Online' : 'After-Hours Dispatch'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {bhStatus.timeString}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Immediate SecOps & GRC Assistance
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Connect directly with certified SOC specialists during business hours for instantaneous answers regarding telemetry configuration, incident containment, or audit proof harvesting.
              </p>

              {/* Hours Timetable */}
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 mb-5 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Business Hours:</span>
                  </span>
                  <strong className="text-white">Mon – Fri: 8:00 AM – 6:00 PM EST</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>On-Duty Lead:</span>
                  <span className="text-emerald-400">Alex Mercer, CISSP (SOC Lead)</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Average Live Response:</span>
                  <span className="text-cyan-400">&lt; 30 Seconds</span>
                </div>
              </div>

              <button
                onClick={onOpenLiveChat}
                id="contact-launch-live-chat-btn"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Launch Live Chat Now</span>
              </button>
            </div>

            {/* Emergency Hotline Card */}
            <div className="rounded-2xl border border-rose-900/50 bg-gradient-to-b from-rose-950/20 to-[#080c14] p-6">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>24/7 Threat Emergency Hotline</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                For ongoing, suspected, or active ransomware, data exfiltration, or cloud credential breaches.
              </p>
              
              <div className="rounded-xl bg-slate-900/90 border border-rose-900/60 p-3.5 flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Air-Gapped Telephony Bridge</span>
                    <strong className="text-sm font-mono text-white tracking-wider">+1 (800) 555-CYBER</strong>
                  </div>
                </div>
                <span className="rounded bg-rose-950 px-2 py-1 text-[10px] font-mono font-bold text-rose-300 border border-rose-800/60">
                  EXT 911
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">
                Direct route to standby Incident Commanders with sub-second SOAR execution clearance.
              </span>
            </div>

            {/* Global Security Operations Centers */}
            <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-5 text-xs text-slate-400 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>Global SOC Command Centers</span>
              </h4>

              <div className="space-y-2">
                <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block text-xs">Austin Operations Command (HQ)</strong>
                    <span className="text-[11px] text-slate-500">100 Congress Ave, Suite 2100, Austin, TX 78701</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">DEFCON 5 ACTIVE</span>
                </div>

                <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block text-xs">Frankfurt Sovereign Node (EU)</strong>
                    <span className="text-[11px] text-slate-500">Mainzer Landstraße 46, 60325 Frankfurt am Main</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">GDPR Compliant</span>
                </div>

                <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block text-xs">Singapore APAC Follow-the-Sun</strong>
                    <span className="text-[11px] text-slate-500">Marina Bay Financial Centre Tower 1, Singapore</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">24/7 Telemetry Ingest</span>
                </div>
              </div>

              {/* PGP Key Fingerprint */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 mb-1">
                  <Key className="h-3 w-3 text-cyan-400" />
                  <span>PGP Key for Secure Vulnerability Disclosure:</span>
                </div>
                <code className="block rounded bg-slate-950 p-1.5 text-[10px] font-mono text-slate-400 break-all border border-slate-800">
                  8A4F 3B92 C109 E7F2 90D4 5518 7A2B 3C4D 9901 EF23
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
