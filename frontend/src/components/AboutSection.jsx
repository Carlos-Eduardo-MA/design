import { motion } from "framer-motion";
import { Award, GraduationCap, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PORTRAIT =
  "https://images.unsplash.com/photo-1654512697655-b2899afacae5?crop=entropy&cs=srgb&fm=jpg&q=85";

const CERTIFICATES = [
  { title: "Pós-graduação em Design de Marcas", org: "Belas Artes · São Paulo", year: "2018" },
  { title: "Especialização em Naming & Verbal Identity", org: "Domestika Pro", year: "2020" },
  { title: "Brand Strategy Masterclass", org: "The Futur", year: "2022" },
  { title: "Certificação em Design Editorial", org: "IED — Istituto Europeo di Design", year: "2023" },
];

const SPECIALIZATIONS = [
  "Identidade Visual",
  "Estratégia de Marca",
  "Naming",
  "Design Editorial",
  "Packaging",
  "Direção de Arte",
  "Tipografia Custom",
  "Rebranding",
];

const AWARDS = [
  { title: "Seleção — Identidade do Ano", org: "Bienal de Design Gráfico", year: "2023" },
  { title: "Destaque em Branding", org: "Design Week Awards", year: "2024" },
  { title: "Top 10 Estúdios Independentes", org: "Clube de Criação", year: "2025" },
];

export const AboutSection = () => (
  <section id="sobre" className="py-24 sm:py-32 bg-[#F3F0EA]" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-[#121212]/15" aria-hidden="true" />
          <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#E63946] rounded-2xl -z-0" aria-hidden="true" />
          <img
            src={PORTRAIT}
            alt="Foto de Marina Duarte, especialista em marcas e branding"
            data-testid="about-portrait"
            className="relative z-10 w-full aspect-[4/5] object-cover rounded-3xl"
          />
          <div className="absolute z-20 bottom-6 left-6 bg-[#FBF9F5]/90 backdrop-blur-md rounded-2xl px-5 py-4">
            <p className="font-serif text-xl">Marina Duarte</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-0.5">
              Fundadora · Duarte® Studio
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#E63946]" /> Sobre
          </p>
          <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl mb-6">
            Menos ruído,
            <br />
            <em className="text-[#E63946]">mais essência.</em>
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Sou Marina, designer de marcas há mais de dez anos. Acredito que uma
            marca forte não nasce de um logo bonito, mas de uma ideia clara —
            aquela que atravessa o cartão de visitas, a embalagem e o jeito de
            falar com o mundo.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-10">
            Já ajudei mais de 120 negócios a encontrar sua voz visual, do café
            da esquina à gestora de investimentos. Meu processo é artesanal:
            pesquisa, estratégia e desenho autoral, sempre lado a lado com o
            cliente.
          </p>

          <Tabs defaultValue="certificados" data-testid="about-tabs">
            <TabsList className="bg-white/70 border border-[rgba(18,18,18,0.1)] rounded-full p-1 mb-6">
              <TabsTrigger
                value="certificados"
                data-testid="about-tab-certificates"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <GraduationCap size={14} className="mr-1.5" /> Certificados
              </TabsTrigger>
              <TabsTrigger
                value="especializacoes"
                data-testid="about-tab-specializations"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <Sparkles size={14} className="mr-1.5" /> Especializações
              </TabsTrigger>
              <TabsTrigger
                value="reconhecimentos"
                data-testid="about-tab-awards"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <Award size={14} className="mr-1.5" /> Prêmios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificados">
              <ul className="space-y-3" data-testid="certificates-list">
                {CERTIFICATES.map((c) => (
                  <li
                    key={c.title}
                    className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium text-sm">{c.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{c.org}</p>
                    </div>
                    <span className="font-mono text-xs text-[#E63946] shrink-0">{c.year}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="especializacoes">
              <div className="flex flex-wrap gap-2" data-testid="specializations-list">
                {SPECIALIZATIONS.map((s) => (
                  <span
                    key={s}
                    className="bg-white border border-[rgba(18,18,18,0.1)] rounded-full px-4 py-2 text-sm hover:border-[#121212] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reconhecimentos">
              <ul className="space-y-3" data-testid="awards-list">
                {AWARDS.map((a) => (
                  <li
                    key={a.title}
                    className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium text-sm">{a.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{a.org}</p>
                    </div>
                    <span className="font-mono text-xs text-[#E63946] shrink-0">{a.year}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  </section>
);
