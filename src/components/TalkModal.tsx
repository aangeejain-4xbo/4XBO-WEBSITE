import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { waLink, WA_CONSULT_MSG, CONSULTATION_PHONE, DEMO_REQUEST_EMAIL } from "../config";

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalkModal: React.FC<TalkModalProps> = ({ isOpen, onClose }) => {
  const channels = [
    {
      id: "whatsapp",
      icon: "WhatsApp",
      label: "WhatsApp",
      sub: "Chat with our team instantly",
      value: "+971 58 509 9086",
      href: waLink(WA_CONSULT_MSG),
      external: true,
      primary: true,
    },
    {
      id: "call",
      icon: "Phone",
      label: "Call Us",
      sub: "Speak to a specialist directly",
      value: "+971 58 509 9086",
      href: `tel:${CONSULTATION_PHONE}`,
      external: false,
      primary: false,
    },
    {
      id: "email",
      icon: "Mail",
      label: "Email Us",
      sub: "Send us your inquiry",
      value: DEMO_REQUEST_EMAIL,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${DEMO_REQUEST_EMAIL}&su=${encodeURIComponent("Inquiry - 4X BackOffice")}`,
      external: true,
      primary: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F]/95 p-6 md:p-8 shadow-2xl grid-bg-overlay"
          >
            {/* Ambient Gold Light */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gold-500/10 blur-[80px]" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gold-400/5 blur-[80px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" /> Let's Talk
                </h3>
                <p className="text-xs text-stone-400 mt-1">Choose how you'd like to reach our team.</p>
              </div>
              <button
                id="close-talk-modal"
                onClick={onClose}
                className="rounded-full p-2 text-stone-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Contact channels */}
            <div className="relative z-10 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  onClick={onClose}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex items-center gap-4 rounded-xl border p-4 transition-all cursor-pointer glow-card ${
                    c.primary ? "border-gold-400/40 bg-gold-500/10" : "border-white/10 bg-[#161616]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-500/10 text-gold-400">
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm font-bold text-white">{c.label}</div>
                    <div className="text-[11px] text-stone-400">{c.sub}</div>
                    <div className="font-mono text-xs text-gold-300 mt-0.5 truncate">{c.value}</div>
                  </div>
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="text-stone-500 group-hover:text-gold-400 transition-colors flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
