import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { WHATSAPP_URL } from "@/config";

const LINES = [
  { text: "Design de marcas", italic: false },
  { text: "com alma,", italic: true, squiggle: true },
  { text: "não só com logo.", italic: false },
];

const STATS = [
  { value: "9+", label: "anos de experiência" },
  { value: "Branding", label: "especialização · Agência Ana Couto" },
  { value: "∞", label: "ideias com propósito" },
];

const SpinningBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
    transition={{
      opacity: { delay: 1.5, duration: 0.6 },
      scale: { delay: 1.5, type: "spring", stiffness: 200, damping: 14 },
      y: { delay: 2, duration: 6, repeat: Infinity, ease: "easeInOut" },
    }}
    className="pointer-events-none absolute right-4 sm:right-16 top-28 sm:top-36 w-28 h-28 sm:w-44 sm:h-44"
    aria-hidden="true"
    data-testid="hero-badge"
  >
    <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
      <defs>
        <path
          id="badge-circle"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          fill="none"
        />
      </defs>
      <text fontSize="13" letterSpacing="4" fill="#121212" fontFamily="'JetBrains Mono', monospace">
        <textPath href="#badge-circle">BIA ASSIS • BRANDING • DESIGN COM ALMA •</textPath>
      </text>
    </svg>
    <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto w-14 h-14 sm:w-20 sm:h-20">
      <circle cx="50" cy="50" r="47" fill="#121212" />
      <circle cx="36" cy="41" r="5" fill="#FBF9F5" />
      <circle cx="64" cy="41" r="5" fill="#FBF9F5" />
      <path d="M31 59 Q50 76 69 59" stroke="#FBF9F5" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  </motion.div>
);

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    data-testid="hero-section"
  >
    <SpinningBadge />

    <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-8 flex items-center gap-3"
        data-testid="hero-eyebrow"
      >
        <span className="w-8 h-px bg-[#121212]" />
        Ana Beatriz Assis — Especialista em marcas
      </motion.p>

      <h1 className="font-serif font-medium tracking-tight leading-[1.12] text-[#121212] text-5xl sm:text-7xl lg:text-8xl">
        {LINES.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-3 -mb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`hero-line-${i + 1}`}
            >
              {line.squiggle ? (
                <span className="relative inline-block italic">
                  {line.text}
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute left-0 -bottom-0.5 sm:-bottom-1 w-full"
                    fill="none"
                    aria-hidden="true"
                    data-testid="hero-squiggle"
                  >
                    <motion.path
                      d="M3 9 C 40 2, 82 13, 120 8 S 192 3, 217 8"
                      stroke="#121212"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.25, duration: 0.9, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              ) : (
                line.text
              )}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="mt-12 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600"
        data-testid="hero-subtitle"
      >
        Branding, identidade visual, naming e editorial para negócios que
        querem ser lembrados — não apenas vistos. Menos ruído, mais essência.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-cta-whatsapp"
          className="group bg-[#121212] text-[#FBF9F5] px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] border border-[#121212] hover:bg-transparent hover:text-[#121212] transition-colors duration-300 flex items-center gap-3"
        >
          Chamar no WhatsApp
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] group-hover:scale-150 transition-transform" />
        </a>
        <a
          href="#portfolio"
          data-testid="hero-cta-portfolio"
          className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] border border-[#121212]/20 hover:border-[#121212] hover:bg-[#121212] hover:text-[#FBF9F5] transition-colors duration-300"
        >
          Ver portfólio
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-16 sm:mt-20 grid grid-cols-3 max-w-lg gap-6 border-t border-[rgba(18,18,18,0.1)] pt-6"
        data-testid="hero-stats"
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-3xl sm:text-4xl">{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>

    <motion.a
      href="#portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
      data-testid="hero-scroll-hint"
      aria-label="Rolar para o portfólio"
    >
      <ArrowDown size={20} className="animate-bounce" />
    </motion.a>
  </section>
);
