import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "#inicio", label: "Início", testid: "nav-link-inicio" },
  { href: "#portfolio", label: "Portfólio", testid: "nav-link-portfolio" },
  { href: "#sobre", label: "Sobre", testid: "nav-link-sobre" },
  { href: "#contato", label: "Contato", testid: "nav-link-contato" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? "bg-[rgba(251,249,245,0.82)] backdrop-blur-md border-b border-[rgba(18,18,18,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" data-testid="nav-logo">
          <Logo size={34} />
          <span className="font-serif text-xl tracking-tight">
            duarte<span className="text-[#E63946]">®</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testid}
              className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            data-testid="admin-open-btn"
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
            title="Painel Admin"
          >
            <Lock size={16} />
          </Link>
          <a
            href="#contato"
            data-testid="nav-cta-contato"
            className="bg-[#121212] text-[#FBF9F5] font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full hover:bg-[#E63946] transition-colors duration-300"
          >
            Fale comigo
          </a>
        </div>

        <button
          className="md:hidden text-neutral-900"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="Abrir menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#FBF9F5] border-t border-[rgba(18,18,18,0.08)] px-6 py-6 flex flex-col gap-5"
          data-testid="nav-mobile-menu"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`${l.testid}-mobile`}
              className="font-serif text-2xl"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/admin"
            data-testid="admin-open-btn-mobile"
            className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"
          >
            <Lock size={14} /> Painel Admin
          </Link>
        </motion.nav>
      )}
    </motion.header>
  );
};
