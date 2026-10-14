import { Logo } from "@/components/Logo";
import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-[#121212] text-[#FBF9F5] pt-16 pb-8" data-testid="footer">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Logo size={40} dark={false} />
            <span className="font-serif text-2xl">
              duarte<span className="text-[#E63946]">®</span>
            </span>
          </div>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">
            Estúdio independente de design de marcas. Menos ruído, mais essência.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          <a href="#inicio" data-testid="footer-link-inicio" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Início</a>
          <a href="#portfolio" data-testid="footer-link-portfolio" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Portfólio</a>
          <a href="#sobre" data-testid="footer-link-sobre" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Sobre</a>
          <a href="#contato" data-testid="footer-link-contato" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Contato</a>
        </nav>
        <div className="flex gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-social-instagram"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E63946] hover:border-[#E63946] transition-colors"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-social-linkedin"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E63946] hover:border-[#E63946] transition-colors"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
      <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3 text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} Duarte® Studio de Marcas</p>
        <p>Feito com café e tipografia em São Paulo</p>
      </div>
    </div>
  </footer>
);
