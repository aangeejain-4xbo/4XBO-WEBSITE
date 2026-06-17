import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { useRouter, PathRoute } from "../router";
import { waLink, WA_CONSULT_MSG } from "../config";

interface NavbarProps {
  onTalkClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTalkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentPath, navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks: { label: string; path: PathRoute }[] = [
    { label: "Home", path: "/" },
    { label: "Why Us", path: "/why-us" },
    { label: "Services", path: "/services" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: PathRoute
  ) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -65, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          scrolled
            ? "bg-[#040405]/95 border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            : "bg-transparent border-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Official brand logo from uploaded source */}
          <div className="flex items-center gap-2">
            <a
              id="nav-logo"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="flex items-center select-none hover:opacity-90 active:scale-[0.98] transition-all duration-300 pointer-events-auto"
            >
              <Logo size="md" />
            </a>
          </div>

          {/* Desktop Navigation with high luxury colors */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101012]/80 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;

              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`text-xs uppercase tracking-[0.16em] font-bold px-[18px] py-2.5 rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "text-gold-300 bg-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                      : "text-stone-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action buttons - sleek and beautiful matching reference */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="desktop-lets-talk-trigger"
              href={waLink(WA_CONSULT_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Consultation with 4X BackOffice on WhatsApp"
              className="inline-block px-5 py-2.5 rounded-none border border-[#d4a02a]/60 bg-[#d4a02a]/5 text-[#f6dc82] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#d4a02a] hover:text-stone-950 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,160,42,0.06)] hover:shadow-[0_4px_20px_rgba(212,160,42,0.22)]"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile Menu Action button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none border border-white/10 hover:border-white/20 text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              <Icon name={isOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#090909]/98 overflow-hidden"
            >
              <div className="px-5 py-6 space-y-4">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path;
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      onClick={(e) => {
                        setIsOpen(false);
                        handleLinkClick(e, link.path);
                      }}
                      className={`block text-[15px] font-medium py-3 px-3 rounded-lg transition-all ${
                        isActive 
                          ? "text-gold-400 font-bold bg-white/[0.04] border-l-2 border-gold-400/80 pl-4" 
                          : "text-stone-300 hover:text-gold-400 hover:bg-white/[0.02]"
                      }`}
                      style={{ minHeight: "44px" }}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <div className="pt-4 border-t border-white/5">
                  <a
                    id="mobile-lets-talk-trigger"
                    href={waLink(WA_CONSULT_MSG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a Consultation with 4X BackOffice on WhatsApp"
                    className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-stone-950 text-sm font-bold shadow-lg cursor-pointer"
                  >
                    Book a Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
