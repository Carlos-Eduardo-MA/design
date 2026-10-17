import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { WHATSAPP_URL } from "@/config";

const STATS = [
  { value: "9+", label: "anos de experiência" },
  { value: "Branding", label: "especialização · Agência Ana Couto" },
  { value: "∞", label: "ideias com propósito" },
];

const PILLS = [
  { text: "branding", bg: "#C9B8FF", color: "#121212", pos: { top: "4%", left: "-6%" }, delay: 0, testid: "hero-pill-branding" },
  { text: "identidade visual", bg: "#FBF9F5", color: "#121212", border: true, pos: { top: "26%", right: "-8%" }, delay: 0.9, testid: "hero-pill-identidade" },
  { text: "naming", bg: "#FFC61A", color: "#121212", pos: { bottom: "24%", left: "-10%" }, delay: 1.8, testid: "hero-pill-naming" },
  { text: "direção de arte", bg: "#121212", color: "#FBF9F5", pos: { bottom: "2%", right: "0%" }, delay: 2.7, testid: "hero-pill-direcao" },
];

const Flower = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true" data-testid="hero-flower">
    <g fill="#FF4A1F">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="100" cy="50" rx="30" ry="50" transform={`rotate(${deg} 100 100)`} />
      ))}
    </g>
    <circle cx="100" cy="100" r="26" fill="#FFC61A" />
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
    className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] h-[440px] sm:h-[540px]"
    data-testid="hero-collage"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      className="absolute -top-10 -right-4 sm:-right-8 w-40 sm:w-56"
    >
      <Flower className="w-full h-full" />
    </motion.div>

    <motion.div
      animate={{ scale: [1, 1.07, 1], rotate: [0, 4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-8 -left-8 sm:-left-12 w-48 h-48 sm:w-60 sm:h-60 bg-[#C9B8FF]"
      style={{ borderRadius: "62% 38% 55% 45% / 48% 52% 48% 52%" }}
      aria-hidden="true"
    />

    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[240px] sm:w-[300px] aspect-[3/4] rounded-t-full rounded-b-[2rem] overflow-hidden border-[6px] border-white shadow-[0_24px_60px_rgba(18,18,18,0.18)] bg-[#EFECE6]"
      data-testid="hero-photo-frame"
    >
      <img
        src="/images/ana-blazer.jpg"
        alt="Ana Beatriz Assis, brand designer"
        data-testid="hero-photo"
        className="w-full h-full object-cover grayscale"
      />
    </div>

    {PILLS.map((pill, i) => (
      <motion.span
        key={pill.text}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 1 + i * 0.15, duration: 0.5 },
          y: { delay: 1.5, duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: pill.delay },
        }}
        className={`absolute font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(18,18,18,0.12)] ${pill.border ? "border border-[#121212]/15" : ""}`}
        style={{ backgroundColor: pill.bg, color: pill.color, ...pill.pos }}
        data-testid={pill.testid}
      >
        {pill.text}
      </motion.span>
    ))}

    <motion.div
      animate={{ rotate: [0, 18, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-2"
    >
      <Sparkle className="w-8 sm:w-10" fill="#C9B8FF" />
    </motion.div>
    <motion.div
      animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-16 -right-2 sm:right-0"
    >
      <Sparkle className="w-6 sm:w-8" fill="#FF4A1F" />
    </motion.div>
    <motion.div
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[42%] -left-6"
    >
      <Sparkle className="w-5" fill="#FFC61A" />
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
          <span className="w-8 h-px bg-[#FF4A1F]" />
          Ana Beatriz Assis — Especialista em marcas
        </motion.p>

        <h1 className="font-serif font-medium tracking-tight leading-[1.12] text-[#121212] text-5xl sm:text-6xl lg:text-7xl">
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
          <span className="block overflow-hidden pb-3 -mb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-line-2"
            >
              <span className="relative inline-block italic">
                <span
                  className="absolute inset-x-[-8px] top-[6%] bottom-[2%] bg-[#FFC61A] -rotate-1 rounded-lg"
                  aria-hidden="true"
                  data-testid="hero-highlight"
                />
                <span className="relative">com alma,</span>
              </span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3 -mb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-line-3"
            >
              não só com logo.
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
          className="mt-14 grid grid-cols-3 max-w-lg gap-6 border-t border-[rgba(18,18,18,0.1)] pt-6"
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
