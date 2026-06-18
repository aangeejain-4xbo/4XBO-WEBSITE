import React from "react";
import { Logo } from "./Logo";
import { AnimatedTrendBackground } from "./AnimatedTrendBackground";
import { useRouter, PathRoute } from "../router";
import {
  CONSULTATION_PHONE,
  CONSULTATION_PHONE_DISPLAY,
  CONTACT_EMAIL,
  WHATSAPP_URL,
  OFFICE_LOCATIONS,
} from "../config";

interface FooterProps {
  onTalkClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTalkClick }) => {
  const { navigate } = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: PathRoute) => {
    e.preventDefault();
    navigate(path);
  };

  // Honest in-content links: every anchor's text matches the page it opens.
  const navLinks: { label: string; path: PathRoute }[] = [
    { label: "Home", path: "/" },
    { label: "Why Us", path: "/why-us" },
    { label: "Services", path: "/services" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  // Keyword-rich internal links pointing to the page that actually covers them.
  const solutionLinks: { label: string; path: PathRoute }[] = [
    { label: "MT5 Administration", path: "/services" },
    { label: "Liquidity Bridges", path: "/services" },
    { label: "Risk Management", path: "/services" },
    { label: "Copy Trading", path: "/products" },
    { label: "Swap Management", path: "/products" },
  ];

  return (
    <footer className="relative bg-[#050505] pt-12 pb-12 overflow-hidden px-4">
      <div className="absolute inset-0 -top-32 pointer-events-none z-0">
        <AnimatedTrendBackground />
      </div>
      {/* Subtle bottom gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center relative z-10">

        {/* Footer columns: brand + honest navigation + keyword-rich solution
            links + a visible NAP/contact block for local-SEO trust signals. */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left relative z-10">

          {/* Column 1: Brand Info */}
          <address className="lg:col-span-4 flex flex-col items-start pr-4 not-italic">
            <a
              id="footer-brand-logo"
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="flex items-center hover:opacity-95 transition-opacity"
            >
              <Logo variant="horizontal" size="md" isFooter={true} />
            </a>
            <p className="font-sans font-light text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm mt-4">
              B2B Forex back office solutions — MT5 administration, server
              management, and liquidity bridges. Institutional precision
              engineered for global markets.
            </p>
            <p className="font-sans font-light text-stone-600 text-[11px] leading-relaxed mt-4">
              © {new Date().getFullYear()} 4X BackOffice. All rights reserved.
            </p>
          </address>

          {/* Column 2: Navigate (real routes only) */}
          <nav aria-label="Footer" className="lg:col-span-2 flex flex-col items-start">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Navigate
            </h2>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              {navLinks.map((link) => (
                <li key={link.path + link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Solutions (keyword-rich anchors to the covering page) */}
          <nav aria-label="Solutions" className="lg:col-span-3 flex flex-col items-start">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Solutions
            </h2>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact / NAP */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Get in Touch
            </h2>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              <li>
                <a
                  href={`tel:${CONSULTATION_PHONE}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {CONSULTATION_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
            <p className="font-sans text-stone-500 text-xs leading-relaxed mt-5">
              <span className="block text-stone-300 font-medium mb-1">Global offices</span>
              {OFFICE_LOCATIONS.join(" · ")}
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
