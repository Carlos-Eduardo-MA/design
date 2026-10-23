import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { WHATSAPP_URL } from "@/config";

const STATS = [
  { value: "10+", label: "anos de experiência" },
  { value: "Branding", label: "especialização · Agência Ana Couto" },
  { value: "∞", label: "ideias com propósito" },
];

const PILLS = [
  { text: "branding", bg: "#C7B7A3", color: "#561C24", pos: { top: "2%", left: "-2%" }, delay: 0, testid: "hero-pill-branding" },
  { text: "identidade visual", bg: "#FBF9F5", color: "#121212", border: true, pos: { top: "38%", right: "-20%" }, delay: 0.9, testid: "hero-pill-identidade" },
  { text: "direção de arte", bg: "#561C24", color: "#E8D8C4", pos: { bottom: "3%", right: "4%" }, delay: 2.7, testid: "hero-pill-direcao" },
];

const Folder = ({ className }) => (
  <svg viewBox="0 0 120 96" className={className} aria-hidden="true" data-testid="hero-folder">
    <path d="M6 22 Q6 10 18 10 h24 l10 12 h50 q12 0 12 12 v6 H6 z" fill="#561C24" />
    <path d="M6 34 h108 l-7 48 q-1.5 10 -11 10 H14 q-9.5 0 -11 -10 z" fill="#6D2932" />
    <path d="M6 34 h108 l-1 7 H7 z" fill="#E8D8C4" opacity="0.25" />
  </svg>
);

const Laptop = ({ className }) => (
  <svg viewBox="0 0 140 100" className={className} aria-hidden="true" data-testid="hero-laptop">
    <rect x="28" y="8" width="84" height="58" rx="7" fill="#FBF9F5" stroke="#561C24" strokeWidth="5" />
    <rect x="40" y="20" width="44" height="6" rx="3" fill="#C7B7A3" />
    <rect x="40" y="32" width="60" height="6" rx="3" fill="#C7B7A3" />
    <rect x="40" y="44" width="30" height="6" rx="3" fill="#6D2932" />
    <path d="M8 74 h124 l-9 16 H17 z" fill="#561C24" />
    <rect x="58" y="76" width="24" height="5" rx="2.5" fill="#FBF9F5" opacity="0.35" />
  </svg>
);

const Sparkle = ({ className, fill }) => (
  <svg viewBox="0 0 100 100" className={className} fill={fill} aria-hidden="true">
    <path d="M50 0 C56 34, 66 44, 100 50 C66 56, 56 66, 50 100 C44 66, 34 56, 0 50 C34 44, 44 34, 50 0 Z" />
  </svg>
);

const HeroCollage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] h-[440px] sm:h-[540px]"
    data-testid="hero-collage"
  >
    <motion.div
      animate={{ scale: [1, 1.07, 1], rotate: [0, 4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-1/2 top-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-[#C7B7A3]"
      style={{ x: "-50%", y: "-50%", borderRadius: "62% 38% 55% 45% / 48% 52% 48% 52%" }}
      aria-hidden="true"
    />

    <motion.img
      src="/images/bia-cabeca.png"
      alt="Ana Beatriz Assis de óculos escuros, adesivo"
      data-testid="hero-photo"
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ x: "-50%", y: "-52%", transformOrigin: "50% 90%", filter: "drop-shadow(0 24px 36px rgba(18,18,18,0.22))" }}
      className="absolute left-1/2 top-1/2 w-[230px] sm:w-[330px]"
    />

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { delay: 1.1, duration: 0.5 },
        y: { delay: 1.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute top-0 right-0 sm:right-2 flex flex-col items-center gap-2"
    >
      <Folder className="w-24 sm:w-32 drop-shadow-[0_14px_20px_rgba(86,28,36,0.25)]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#561C24]">
        projetos
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -9, 0] }}
      transition={{
        opacity: { delay: 1.3, duration: 0.5 },
        y: { delay: 1.8, duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 },
      }}
      className="absolute bottom-0 left-0 sm:left-2"
    >
      <Laptop className="w-28 sm:w-40 drop-shadow-[0_14px_20px_rgba(86,28,36,0.25)]" />
    </motion.div>

    {PILLS.map((pill, i) => (
      <motion.span
        key={pill.text}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 1 + i * 0.15, duration: 0.5 },
          y: { delay: 1.5, duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: pill.delay },
        }}
        className={`absolute font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(18,18,18,0.12)] ${pill.border ? "border border-[#561C24]/20" : ""}`}
        style={{ backgroundColor: pill.bg, color: pill.color, ...pill.pos }}
        data-testid={pill.testid}
      >
        {pill.text}
      </motion.span>
    ))}

    <motion.div
      animate={{ rotate: [0, 18, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-8 left-4"
    >
      <Sparkle className="w-8 sm:w-10" fill="#6D2932" />
    </motion.div>
    <motion.div
      animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-24 right-0"
    >
      <Sparkle className="w-6 sm:w-8" fill="#561C24" />
    </motion.div>
    <motion.div
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[52%] -left-4"
    >
      <Sparkle className="w-5" fill="#C7B7A3" />
    </motion.div>
  </motion.div>
);

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    data-testid="hero-section"
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-8 flex items-center gap-3"
          data-testid="hero-eyebrow"
        >
          <span className="w-8 h-px bg-[#6D2932]" />
          Ana Beatriz Assis — Especialista em marcas
        </motion.p>

        <h1 className="font-serif font-black tracking-tight leading-[1.08] text-[#121212] text-5xl sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden pb-3 -mb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-line-1"
            >
              Design de marcas
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-4 -mb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-line-2"
            >
              <span
                className="font-script inline-block -rotate-2 text-[#6D2932] text-6xl sm:text-7xl lg:text-8xl pr-2"
                data-testid="hero-script-word"
              >
                com alma,
              </span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3 pt-1">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-line-3"
            >
              <span className="inline-block rotate-1 bg-[#E8D8C4] border-[3px] border-dashed border-[#561C24] rounded-2xl px-4 py-1 text-[#561C24]">
                não só com logo.
              </span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-12 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600"
          data-testid="hero-subtitle"
        >
          Branding, identidade visual e editorial para negócios que
          querem ser lembrados não apenas vistos. Menos ruído, mais essência.
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
            className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] border border-[#121212]/20 text-[#121212] hover:border-[#121212] hover:bg-[#121212] hover:text-[#FBF9F5] transition-colors duration-300"
          >
            Ver portfólio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-14 grid grid-cols-3 max-w-lg gap-6 border-t border-[rgba(18,18,18,0.1)] pt-6"
          data-testid="hero-stats"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif font-bold text-2xl sm:text-3xl text-[#121212]">{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <HeroCollage />
    </div>

    <motion.a
      href="#portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
      data-testid="hero-scroll-hint"
      aria-label="Rolar para o portfólio"
    >
      <ArrowDown size={20} className="animate-bounce" />
    </motion.a>
  </section>
);
