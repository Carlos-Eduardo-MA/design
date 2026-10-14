import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { WHATSAPP_URL } from "@/config";

const LINES = [
  { text: "Design de marcas", italic: false },
  { text: "com alma,", italic: true },
  { text: "não só com logo.", italic: false },
];

const STATS = [
  { value: "10+", label: "anos de estrada" },
  { value: "120+", label: "marcas criadas" },
  { value: "8", label: "prêmios de design" },
];

const Asterisk = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    {[0, 45, 90, 135].map((deg) => (
      <line
        key={deg}
        x1="50"
        y1="6"
        x2="50"
        y2="94"
        stroke="#121212"
        strokeWidth="2"
        transform={`rotate(${deg} 50 50)`}
      />
    ))}
  </svg>
);

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMark = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
      data-testid="hero-section"
    >
      <motion.div
        style={{ y: yMark, rotate }}
        className="pointer-events-none absolute -right-16 top-24 w-[300px] sm:w-[420px] opacity-[0.07]"
        aria-hidden="true"
      >
        <Asterisk />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-8 flex items-center gap-3"
          data-testid="hero-eyebrow"
        >
          <span className="w-8 h-px bg-[#E63946]" />
          Marina Duarte — Especialista em marcas · São Paulo
        </motion.p>

        <h1 className="font-serif font-medium tracking-tight leading-[1.05] text-[#121212] text-5xl sm:text-7xl lg:text-8xl">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${line.italic ? "italic text-[#E63946]" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`hero-line-${i + 1}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600"
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
            className="group bg-[#121212] text-[#FBF9F5] px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#E63946] transition-colors duration-300 flex items-center gap-3"
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
};
