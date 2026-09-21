import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Wrench, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { servicesData } from '../../data/servicesData';

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { getBookingById } = useBooking();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hello! I'm your QuickMend Assistant. How can I help you today with your home appliance repair?",
      timestamp: 'Just now',
      quickReplies: [
        "💰 Repair Pricing",
        "⚡ 24-Hour Delivery",
        "🔍 Track My Repair",
        "📅 Book a Service",
        "💬 WhatsApp Desk"
      ]
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotReply(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotReply = (rawInput) => {
    const input = rawInput.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if input looks like a Repair ID (QM-2026-XXXX or QM-...)
    const idMatch = rawInput.match(/QM-[0-9A-Z-]+/i);
    if (idMatch) {
      const foundId = idMatch[0].toUpperCase();
      const record = getBookingById(foundId);
      if (record) {
        return {
          id: Date.now() + 1,
          sender: 'bot',
          text: `🔍 Found your Repair Record for **${foundId}**:\n\n• **Customer**: ${record.customerName}\n• **Appliance**: ${record.appliance} (${record.brand})\n• **Current Stage**: Stage ${record.currentStep}/8 — ${record.currentStatus}\n• **Assigned Engineer**: ${record.assignedTechnician || 'Assigned'}\n• **Delivery**: ${record.pickupType}`,
          actionLink: `/tracking?id=${foundId}`,
          actionText: `Open Full Tracking Timeline →`,
          timestamp: timeStr
        };
      } else {
        return {
          id: Date.now() + 1,
          sender: 'bot',
          text: `I could not find an active repair under ID **${foundId}** in your current session. Please verify the ID number or book a new repair.`,
          quickReplies: ["📅 Book a Service", "🔍 Track Another ID"],
          timestamp: timeStr
        };
      }
    }

    // Pricing inquiries
    if (input.includes('price') || input.includes('cost') || input.includes('rate') || input.includes('fee') || input.includes('charge') || input.includes('pricing')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `💰 **QuickMend Fixed Starting Rates** (Inspection & Diagnosis included):\n\n• **Water Purifier**: ₹199\n• **Microwave & Geyser**: ₹249\n• **Washing Machine**: ₹299\n• **Refrigerator & TV**: ₹349\n• **AC Deep Service**: ₹399\n\nAll repairs include 24-hour return and genuine OEM parts!`,
        actionLink: `/services`,
        actionText: `Explore All Services & Pricing →`,
        timestamp: timeStr
      };
    }

    // 24 Hour Delivery inquiries
    if (input.includes('24') || input.includes('hour') || input.includes('time') || input.includes('fast') || input.includes('speed') || input.includes('delivery') || input.includes('pickup')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `⚡ **24-Hour Express Repair Commitment**:\n\nWhen you request doorstep pickup, our certified logistics team safely collects your appliance, performs multi-point diagnostics at our station, and delivers it back repaired within 24 hours!`,
        actionLink: `/booking`,
        actionText: `Book Doorstep Pickup (24h) →`,
        timestamp: timeStr
      };
    }

    // Booking inquiries
    if (input.includes('book') || input.includes('schedule') || input.includes('fix') || input.includes('repair my') || input.includes('service')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `📅 You can book a repair in just 60 seconds! Select your state, city, appliance type, and choose doorstep pickup if needed. You will immediately receive a unique Repair ID.`,
        actionLink: `/booking`,
        actionText: `Go to Booking Form →`,
        timestamp: timeStr
      };
    }

    // Tracking inquiries
    if (input.includes('track') || input.includes('status') || input.includes('where is')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `🔍 To track your machine, simply type your **Repair ID** (e.g. *QM-2026-8841*) directly here in this chat, or visit our dedicated Tracking page.`,
        actionLink: `/tracking`,
        actionText: `Visit Tracking Page →`,
        timestamp: timeStr
      };
    }

    // Contact & WhatsApp
    if (input.includes('whatsapp') || input.includes('contact') || input.includes('phone') || input.includes('number') || input.includes('call') || input.includes('helpline')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `📞 **QuickMend Support Channels**:\n\n• **Helpline**: +91 92790 41718 (8 AM - 9 PM)\n• **Official Email**: replypalak525@gmail.com\n• **WhatsApp**: Instant chat available 24/7`,
        externalLink: `https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20am%20chatting%20via%20the%20AI%20Assistant.`,
        externalText: `Chat with Live Support on WhatsApp →`,
        timestamp: timeStr
      };
    }

    // Specific appliances
    if (input.includes('fridge') || input.includes('refrigerator')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `❄️ **Refrigerator Repair Assistance**:\n\nWe fix cooling issues, gas leakage, compressor failure, defrost errors, and thermostat faults with 24-hour return (Starts at ₹349).`,
        actionLink: `/booking?appliance=Refrigerator`,
        actionText: `Book Refrigerator Repair →`,
        timestamp: timeStr
      };
    }

    if (input.includes('washing') || input.includes('washer')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `🧺 **Washing Machine Repair**:\n\nWe fix spin issues, drain motor blocks, error codes, and high vibrations across Front Load & Top Load models (Starts at ₹299).`,
        actionLink: `/booking?appliance=Washing%20Machine`,
        actionText: `Book Washing Machine Repair →`,
        timestamp: timeStr
      };
    }

    if (input.includes('ac') || input.includes('air conditioner') || input.includes('cooling')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        text: `💨 **AC Repair & Jet Servicing**:\n\nWe handle gas refilling, PCB repair, water leakage, and jet pump deep servicing for all inverter & split units (Starts at ₹399).`,
        actionLink: `/booking?appliance=AC`,
        actionText: `Book AC Repair →`,
        timestamp: timeStr
      };
    }

    // Default fallback
    return {
      id: Date.now() + 1,
      sender: 'bot',
      text: `I'm here to assist with any appliance repair across India! You can ask about our 24-hour delivery, pricing starting at ₹199, book a service, or enter your Repair ID to check real-time progress.`,
      quickReplies: [
        "💰 Repair Pricing",
        "⚡ 24-Hour Delivery",
        "📅 Book a Service",
        "💬 WhatsApp Desk"
      ],
      timestamp: timeStr
    };
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-black shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:shadow-[0_0_40px_rgba(0,229,255,0.8)] transition-all duration-300 transform hover:scale-105"
            aria-label="Open QuickMend AI Assistant"
          >
            <div className="w-8 h-8 rounded-full bg-[#020817] text-[#00E5FF] flex items-center justify-center">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold pr-1">Need Help? Chat</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00E5FF]"></span>
            </span>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] rounded-3xl bg-[#071328] border border-[#00E5FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0B1730] to-[#040D20] border-b border-[#00E5FF]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#020817] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]">
                <Bot className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#020817]"></span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>QuickMend Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                </h4>
                <p className="text-[10px] text-[#00E5FF]">Online • 24/7 AI Repair Support</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-[#061024] hover:bg-[#0B1730] text-[#9FB1C7] hover:text-white border border-slate-800 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#020817]/90 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0B1730] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-semibold rounded-tr-none'
                        : 'bg-[#0B1730] text-slate-100 border border-[#00E5FF]/20 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {/* Action link inside bot message */}
                    {msg.actionLink && (
                      <div className="mt-3 pt-2 border-t border-slate-800">
                        <Link
                          to={msg.actionLink}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#020817] font-bold text-[11px] transition-all"
                        >
                          <span>{msg.actionText}</span>
                        </Link>
                      </div>
                    )}

                    {/* External WhatsApp action link */}
                    {msg.externalLink && (
                      <div className="mt-3 pt-2 border-t border-slate-800">
                        <a
                          href={msg.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white font-bold text-[11px] transition-all"
                        >
                          <span>{msg.externalText}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Quick replies */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((reply, ridx) => (
                        <button
                          key={ridx}
                          onClick={() => handleSendMessage(reply)}
                          className="px-2.5 py-1 rounded-full bg-[#071328] hover:bg-[#00E5FF]/20 text-[#00E5FF] hover:text-white border border-[#00E5FF]/30 text-[10px] font-semibold transition-all"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] text-[#9FB1C7] text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#9FB1C7] text-[11px] pl-9">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>QuickMend is typing...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-[#071328] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask pricing, 24h repair, or enter Repair ID..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#020817] text-white placeholder-slate-500 border border-[#00E5FF]/20 focus:border-[#00E5FF] text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-9 h-9 rounded-xl bg-[#00E5FF] hover:bg-[#38EFFF] text-[#020817] flex items-center justify-center disabled:opacity-40 transition-all flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
