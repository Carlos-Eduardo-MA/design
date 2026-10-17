import { motion } from "framer-motion";
import { PenTool, GraduationCap, Sparkles, Briefcase } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PORTRAIT = "/images/ana-retrato.jpg";

const CERTIFICATES = [
  { title: "Graduação em Design", org: "Formação universitária" },
  { title: "Especialização em Branding", org: "Agência Ana Couto" },
  { title: "Identidade Visual", org: "Curso de extensão" },
  { title: "UI & UX Design", org: "Curso de extensão" },
  { title: "Mídias Sociais & Liderança", org: "Cursos complementares" },
];

const EXPERIENCE = [
  { title: "Diretora de Arte Sênior", org: "VCRP" },
  { title: "Brand Designer & Estrategista de Marketing", org: "Mediccont · rebranding e linhas de serviço" },
  { title: "Designer", org: "Myne Agency · marketing médico de luxo e Design Thinking" },
  { title: "Conteúdo & Marketing Digital", org: "Nós · fábrica de conteúdo" },
];

const SPECIALIZATIONS = [
  "Branding",
  "Identidade Visual",
  "Direção de Arte",
  "Design Digital",
  "Design Impresso",
  "Design Gráfico",
  "UI & UX",
  "Mídias Sociais",
];

const TOOLS = [
  { title: "Adobe Illustrator", org: "Ferramenta principal de criação" },
  { title: "Adobe Photoshop", org: "Tratamento e mockups" },
  { title: "Adobe Creative Cloud", org: "Membro desde 2016" },
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
            alt="Foto de Ana Beatriz Assis, designer especialista em marcas e branding"
            data-testid="about-portrait"
            className="relative z-10 w-full aspect-[4/5] object-cover rounded-3xl"
          />
          <div className="absolute z-20 bottom-6 left-6 bg-[#FBF9F5]/90 backdrop-blur-md rounded-2xl px-5 py-4">
            <p className="font-serif text-xl">Ana Beatriz Assis</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-0.5">
              Bia Assis® · Brand Designer
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
            Sou a Bia — Ana Beatriz Assis — brand designer e diretora de arte
            com cerca de 9 anos de estrada. Especializada em branding e
            identidades visuais, meu foco é desenvolver marcas autênticas, que
            buscam seu propósito e sua voz no mundo.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-10">
            Minha paixão é criar soluções limpas e eficazes para mídia digital
            e impressa, sempre pensadas em quem está do outro lado. Formada em
            Design, com especialização em Branding pela agência Ana Couto e
            passagens por agências como VCRP, Mediccont e Myne — sempre
            aprendendo para fazer a diferença em cada projeto.
          </p>

          <Tabs defaultValue="experiencia" data-testid="about-tabs">
            <TabsList className="bg-white/70 border border-[rgba(18,18,18,0.1)] rounded-full p-1 mb-6 flex-wrap h-auto">
              <TabsTrigger
                value="experiencia"
                data-testid="about-tab-experience"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <Briefcase size={14} className="mr-1.5" /> Experiência
              </TabsTrigger>
              <TabsTrigger
                value="certificados"
                data-testid="about-tab-certificates"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <GraduationCap size={14} className="mr-1.5" /> Formação
              </TabsTrigger>
              <TabsTrigger
                value="especializacoes"
                data-testid="about-tab-specializations"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <Sparkles size={14} className="mr-1.5" /> Especializações
              </TabsTrigger>
              <TabsTrigger
                value="ferramentas"
                data-testid="about-tab-tools"
                className="rounded-full font-mono text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-[#121212] data-[state=active]:text-[#FBF9F5]"
              >
                <PenTool size={14} className="mr-1.5" /> Ferramentas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experiencia">
              <ul className="space-y-3" data-testid="experience-list">
                {EXPERIENCE.map((e) => (
                  <li
                    key={e.title}
                    className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] px-5 py-4"
                  >
                    <p className="font-medium text-sm">{e.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{e.org}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="certificados">
              <ul className="space-y-3" data-testid="certificates-list">
                {CERTIFICATES.map((c) => (
                  <li
                    key={c.title}
                    className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] px-5 py-4"
                  >
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{c.org}</p>
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

            <TabsContent value="ferramentas">
              <ul className="space-y-3" data-testid="tools-list">
                {TOOLS.map((t) => (
                  <li
                    key={t.title}
                    className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] px-5 py-4"
                  >
                    <p className="font-medium text-sm">{t.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{t.org}</p>
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
