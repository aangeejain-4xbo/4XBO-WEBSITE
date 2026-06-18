import React from "react";
import { Logo } from "./Logo";
import { AnimatedTrendBackground } from "./AnimatedTrendBackground";
import { useRouter, PathRoute } from "../router";

interface FooterProps {
  onTalkClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTalkClick }) => {
  const { navigate } = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: PathRoute) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="relative bg-[#050505] pt-12 pb-12 overflow-hidden px-4">
      <div className="absolute inset-0 -top-32 pointer-events-none z-0">
        <AnimatedTrendBackground />
      </div>
      {/* Subtle bottom gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center relative z-10">

        {/* Brand Multi-Column Grid Layout matching user diagram perfectly */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left relative z-10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start pr-4">
            <a
              id="footer-brand-logo"
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="flex items-center hover:opacity-95 transition-opacity"
            >
              <Logo variant="horizontal" size="md" isFooter={true} />
            </a>
            <p className="font-sans font-light text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              © {new Date().getFullYear()} 4X BackOffice. All rights reserved. Institutional precision engineered for global markets.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:col-span-2.5 flex flex-col items-start">
            <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Platform
            </h4>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              <li>
                <a
                  href="/products"
                  onClick={(e) => handleLinkClick(e, "/products")}
                  className="hover:text-gold-400 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLinkClick(e, "/services")}
                  className="hover:text-gold-400 transition-colors"
                >
                  Liquidity
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLinkClick(e, "/services")}
                  className="hover:text-gold-400 transition-colors"
                >
                  Execution
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleLinkClick(e, "/contact")} 
                  className="hover:text-gold-400 transition-colors"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2.5 flex flex-col items-start">
            <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              <li>
                <a
                  href="/why-us"
                  onClick={(e) => handleLinkClick(e, "/why-us")}
                  className="hover:text-gold-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleLinkClick(e, "/contact")} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/why-us"
                  onClick={(e) => handleLinkClick(e, "/why-us")}
                  className="hover:text-gold-400 transition-colors"
                >
                  Mission
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, "/contact")}
                  className="hover:text-gold-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-6">
              Legal
            </h4>
            <ul className="space-y-3 font-sans text-stone-400 text-sm">
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleLinkClick(e, "/contact")} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleLinkClick(e, "/contact")} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleLinkClick(e, "/contact")} 
                  className="hover:text-gold-400 transition-colors"
                >
                  Risk Disclosure
                </a>
              </li>
            </ul>
          </div>

        </div>



      </div>
    </footer>
  );
};
