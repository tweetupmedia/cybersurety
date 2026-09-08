import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Shield, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenAuditModal?: () => void;
  onNavigateToServices?: (subpage?: any) => void;
}

// Check if current EST time is within Mon-Fri 08:00 to 18:00
function isWithinBusinessHours(): { isBusinessHours: boolean; estTimeString: string; dayName: string } {
  const now = new Date();
  // Get time in America/New_York (EST/EDT)
  const estFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  
  const parts = estFormatter.formatToParts(now);
  let weekday = '';
  let hour = 12;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
  const isTime = hour >= 8 && hour < 18;
  const isBusinessHours = isWeekday && isTime;

  const displayTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    isBusinessHours,
    estTimeString: `${displayTime} EST`,
    dayName: weekday,
  };
}

const DEFAULT_QUICK_QUESTIONS = [
  'What is your MTTD and containment speed SLA?',
  'We suspect an active cyber incident right now',
  'How does continuous ISO 27001 & SOC 2 evidence work?',
  'What are your enterprise pricing tiers?',
  'Can I schedule a live SOC & threat radar demo?',
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onClose,
  onOpen,
  onOpenAuditModal,
  onNavigateToServices,
}) => {
  // Business hours state (with user override option for testing)
  const [overrideBusinessHours, setOverrideBusinessHours] = useState<boolean | null>(null);
  const [realtimeClock, setRealtimeClock] = useState(isWithinBusinessHours());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update clock every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeClock(isWithinBusinessHours());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const isChatActive = overrideBusinessHours !== null 
    ? overrideBusinessHours 
    : realtimeClock.isBusinessHours;

  // Initialize greeting based on business hours
  useEffect(() => {
    const agentName = 'Alex Mercer (SOC Lead, CISSP)';
    if (isChatActive) {
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'agent',
          agentName,
          text: `Welcome to CyberSurety live defense desk! I'm Alex Mercer on active duty at the Austin SOC. We are currently inside live business hours. How can our security engineering team assist your organization today?`,
          timestamp: 'Just now',
          quickOptions: DEFAULT_QUICK_QUESTIONS,
        },
      ]);
    } else {
      setMessages([
        {
          id: 'after-hours-msg',
          sender: 'agent',
          agentName: 'CyberSurety Autonomous Dispatch',
          text: `You have reached CyberSurety outside standard North American business hours (Mon–Fri, 8:00 AM – 6:00 PM EST). Our Autonomous AI Triager is online for immediate technical guidance, and our 24/7 Critical Defense Hotline is on standby for active breaches.`,
          timestamp: 'Just now',
          quickOptions: [
            'How do I report an urgent breach?',
            'What is your MTTD and containment speed SLA?',
            'Schedule an audit during business hours',
            'Toggle Business Hours (Testing Mode)',
          ],
        },
      ]);
    }
  }, [isChatActive]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Generate smart context-aware security response
    setTimeout(() => {
      const response = generateAgentResponse(messageContent, isChatActive);
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 900);
  };

  const generateAgentResponse = (userText: string, inBusinessHours: boolean): ChatMessage => {
    const textLower = userText.toLowerCase();
    const agentName = inBusinessHours ? 'Alex Mercer (SOC Lead)' : 'CyberSurety Autonomous Dispatch';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (textLower.includes('toggle business hours') || textLower.includes('testing mode')) {
      setOverrideBusinessHours(!isChatActive);
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `Switched business hours mode to: ${!isChatActive ? 'ACTIVE (Online SecOps)' : 'OFFLINE (After-Hours Dispatch)'}. You can test responses under both states!`,
        timestamp,
      };
    }

    if (textLower.includes('urgent') || textLower.includes('breach') || textLower.includes('ransomware') || textLower.includes('incident')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `CRITICAL TRIAGE: If you are experiencing an ongoing breach, immediately contact our 24/7 Air-Gapped Emergency Hotline at +1 (800) 555-CYBER (Pin: EXT-911). Our sub-second SOAR playbooks can also be activated immediately to isolate affected VPC subnets and revoke active IAM STS sessions in under 300ms.`,
        timestamp,
        quickOptions: [
          'What is your containment speed?',
          'Schedule emergency breach containment',
        ],
      };
    }

    if (textLower.includes('mttd') || textLower.includes('sla') || textLower.includes('containment') || textLower.includes('speed')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `Our benchmarked telemetry performance guarantees:
• Mean Time to Detect (MTTD): < 14 seconds (via eBPF kernel probes)
• Autonomous Containment Speed: 280ms average
• SOC Triage SLA: < 15 minutes for critical DEFCON 1 alerts
• Telemetry Ingestion: Up to 500,000 EPS without dropped packets.
Would you like me to open our live Threat Radar to see this in action?`,
        timestamp,
        quickOptions: [
          'How does continuous ISO 27001 & SOC 2 evidence work?',
          'Can I schedule a live SOC & threat radar demo?',
        ],
      };
    }

    if (textLower.includes('iso') || textLower.includes('soc 2') || textLower.includes('compliance') || textLower.includes('audit') || textLower.includes('hipaa')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `CyberSurety automates evidence collection across 85+ cloud connectors (AWS, Azure, GCP, Okta, GitHub). Each telemetry event produces a SHA-256 cryptographic proof linked to NIST CSF 2.0, ISO/IEC 27001:2022, SOC 2 Type II, and HIPAA §164.312 controls, eliminating 90%+ of manual auditor evidence gathering.`,
        timestamp,
        quickOptions: [
          'Schedule an audit readiness assessment',
          'What are your enterprise pricing tiers?',
        ],
      };
    }

    if (textLower.includes('pricing') || textLower.includes('cost') || textLower.includes('tier') || textLower.includes('quote')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `We offer predictable, all-inclusive monthly pricing:
1. Sentinel Core: $1,490/mo (Up to 500 assets, automated EDR & NIST CSF baseline)
2. Defcon Enterprise: $3,850/mo (Up to 2,500 assets, sub-300ms SOAR, multi-cloud GRC)
3. Sovereign CyberSurety: Custom (Unlimited assets, air-gapped dedicated SOC, custom playbooks).
All plans include unlimited compliance framework crosswalks with no per-user penalties.`,
        timestamp,
        quickOptions: [
          'Schedule an audit with our executive team',
          'What is your MTTD and containment speed SLA?',
        ],
      };
    }

    if (textLower.includes('demo') || textLower.includes('schedule') || textLower.includes('call') || textLower.includes('contact')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `I'd be happy to arrange a personalized technical walkthrough with one of our Senior Incident Commanders. We will simulate an adversary injection against your sandbox and review your FAIR exposure score. Click below to schedule immediately!`,
        timestamp,
        quickOptions: ['Open Schedule Audit Window', 'Continue chatting with Alex'],
      };
    }

    if (textLower.includes('open schedule audit window')) {
      if (onOpenAuditModal) onOpenAuditModal();
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName,
        text: `Opening the Schedule Audit window for you right now. You can choose your preferred time slot and compliance scope!`,
        timestamp,
      };
    }

    // Default intelligent response
    return {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      agentName,
      text: `Thank you for your question. As ${inBusinessHours ? 'on-duty SOC specialist' : 'autonomous security triager'}, I can help verify your current security architecture against known MITRE ATT&CK vectors, review compliance crosswalks, or calculate your organization's FAIR financial risk exposure. What specific area would you like to explore?`,
      timestamp,
      quickOptions: [
        'What is your MTTD and containment speed SLA?',
        'How does continuous ISO 27001 & SOC 2 evidence work?',
        'Schedule an audit with our executive team',
      ],
    };
  };

  return (
    <>
      {/* Floating Launcher Button (visible when chat window is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* Status Tooltip Pill */}
          <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-[#080c14]/95 px-3 py-1 text-xs text-slate-300 shadow-xl backdrop-blur-md animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isChatActive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isChatActive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="font-mono text-[11px]">
              {isChatActive ? 'Live SOC Specialists Online' : 'After-Hours Dispatch Active'}
            </span>
          </div>

          {/* Big Launcher Button */}
          <button
            onClick={() => {
              onOpen();
              setIsMinimized(false);
              setUnreadCount(0);
            }}
            id="floating-live-chat-btn"
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 text-white shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50 focus:outline-none"
            aria-label="Open Live Chat"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#080c14] group-hover:bg-[#0c1220] transition-colors">
              <MessageSquare className="h-6 w-6 text-cyan-400 transition-transform group-hover:scale-110" />
            </div>

            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md shadow-rose-500/50">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl border border-slate-800 bg-[#080c14]/95 backdrop-blur-2xl shadow-2xl shadow-black/80 transition-all ${
            isMinimized 
              ? 'w-80 h-14 overflow-hidden' 
              : 'w-[95vw] sm:w-[420px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#05080f] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-800/50">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${isChatActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">CyberSurety SOC Live Desk</span>
                  <span className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-semibold ${
                    isChatActive 
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' 
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                  }`}>
                    {isChatActive ? 'BUSINESS HOURS' : 'AFTER-HOURS'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {isChatActive ? 'Alex Mercer (SOC Lead) on duty' : 'Automated Triage Dispatch'}
                </span>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Collapsed view body */}
          {!isMinimized && (
            <>
              {/* Telemetry & Business Hours Banner */}
              <div className="border-b border-slate-800/60 bg-[#080d1a] px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  <span>Mon–Fri, 8AM–6PM EST ({realtimeClock.estTimeString})</span>
                </div>
                {/* Business Hours Simulation Toggle Button */}
                <button
                  onClick={() => setOverrideBusinessHours(prev => prev === null ? !realtimeClock.isBusinessHours : !prev)}
                  title="Toggle between Business Hours and After-Hours modes for testing"
                  className="rounded bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 text-[9px] text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="h-2.5 w-2.5" />
                  <span>{isChatActive ? 'Force After-Hours' : 'Force Biz Hours'}</span>
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {msg.sender !== 'user' && msg.agentName && (
                      <span className="text-[10px] font-mono text-cyan-400 mb-1 flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        {msg.agentName}
                      </span>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick suggestion chips if available */}
                    {msg.quickOptions && msg.quickOptions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                        {msg.quickOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(opt)}
                            className="rounded-lg border border-slate-800 bg-slate-900/70 hover:bg-cyan-950/60 hover:border-cyan-600/50 px-2.5 py-1 text-[11px] text-cyan-300 transition-all text-left flex items-center gap-1"
                          >
                            <span>{opt}</span>
                            <ChevronRight className="h-2.5 w-2.5 opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono bg-slate-900/60 p-2 rounded-xl border border-slate-800 w-fit">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>{isChatActive ? 'Alex Mercer is typing analysis...' : 'SecOps engine processing...'}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Emergency Hotline Alert Strip */}
              <div className="border-t border-slate-800/80 bg-[#05080f] px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-rose-400">
                  <PhoneCall className="h-3 w-3" />
                  <span>24/7 Incident Hotline: <strong>+1 (800) 555-CYBER</strong></span>
                </span>
                <span className="text-slate-500">SLA: &lt;15m</span>
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="border-t border-slate-800 p-3 bg-[#080c14]"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isChatActive
                        ? 'Type your question for on-duty SecOps...'
                        : 'Ask the after-hours triage dispatch...'
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-3.5 pr-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="absolute right-1.5 rounded-lg bg-cyan-500 p-1.5 text-slate-950 transition-all hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Encrypted end-to-end (AES-256)</span>
                  <span>Direct Austin & Frankfurt SOC Link</span>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
