import { useState } from "react";
import { motion } from "framer-motion";

const PORTRAIT = "/images/bia-notebook.png";

const EXPERIENCE = [
  { title: "Diretora de Arte Sênior", org: "VCRP" },
  { title: "Brand Designer & Estrategista de Marketing", org: "Mediccont · rebranding e linhas de serviço" },
  { title: "Designer", org: "Myne Agency · marketing médico de luxo e Design Thinking" },
  { title: "Conteúdo & Marketing Digital", org: "Nós · fábrica de conteúdo" },
];

const CERTIFICATES = [
  { title: "Graduação em Design", org: "Formação universitária" },
  { title: "Especialização em Branding", org: "Agência Ana Couto" },
  { title: "Identidade Visual", org: "Curso de extensão" },
  { title: "UI & UX Design", org: "Curso de extensão" },
  { title: "Mídias Sociais & Liderança", org: "Cursos complementares" },
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

const ItemList = ({ items, dark }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li
        key={item.title}
        className={`rounded-xl px-5 py-4 ${
          dark ? "bg-[#E8D8C4]/10" : "bg-white/60"
        }`}
      >
        <p className="font-semibold text-sm">{item.title}</p>
        <p className={`text-xs mt-0.5 ${dark ? "text-[#E8D8C4]/60" : "text-[#121212]/60"}`}>
          {item.org}
        </p>
      </li>
    ))}
  </ul>
);

const ChipList = ({ items, dark }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((s) => (
      <span
        key={s}
        className={`rounded-full px-4 py-2 text-sm border ${
          dark
            ? "border-[#E8D8C4]/30 bg-[#E8D8C4]/10"
            : "border-[#121212]/20 bg-white/60"
        }`}
      >
        {s}
      </span>
    ))}
  </div>
);

const FOLDERS = [
  { id: "experiencia", label: "Experiência", bg: "#C7B7A3", dark: false, tabLeft: "6%", content: <ItemList items={EXPERIENCE} /> },
  { id: "formacao", label: "Formação", bg: "#E8D8C4", dark: false, tabLeft: "30%", content: <ItemList items={CERTIFICATES} /> },
  { id: "especializacoes", label: "Especializações", bg: "#6D2932", dark: true, tabLeft: "52%", content: <ChipList items={SPECIALIZATIONS} dark /> },
  { id: "ferramentas", label: "Ferramentas", bg: "#561C24", dark: true, tabLeft: "74%", content: <ItemList items={TOOLS} dark /> },
];

const FolderStack = () => {
  const [active, setActive] = useState("experiencia");
  const ordered = [
    ...FOLDERS.filter((f) => f.id !== active),
    ...FOLDERS.filter((f) => f.id === active),
  ];

  return (
    <div className="pt-9" data-testid="about-folders">
      {ordered.map((f, i) => {
        const isActive = f.id === active;
        return (
          <motion.div
            key={f.id}
            layout
            onClick={() => setActive(f.id)}
            data-testid={`folder-tab-${f.id}`}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={`relative rounded-t-3xl ${
              isActive
                ? "rounded-b-3xl z-10 shadow-[0_-14px_44px_rgba(18,18,18,0.15)]"
                : "cursor-pointer hover:-translate-y-1.5 transition-transform"
            }`}
            style={{
              backgroundColor: f.bg,
              color: f.dark ? "#E8D8C4" : "#561C24",
              marginTop: i === 0 ? 0 : -16,
              rotate: isActive ? 0 : i % 2 ? 0.7 : -0.7,
            }}
          >
            <span
              className="absolute -top-8 h-8 px-5 rounded-t-2xl flex items-center font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ backgroundColor: f.bg, left: f.tabLeft }}
            >
              {f.label}
            </span>
            {isActive ? (
              <div className="p-5 sm:p-7 pt-8" data-testid={`folder-content-${f.id}`}>
                {f.content}
              </div>
            ) : (
              <div className="h-11" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

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
          <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#6D2932] rounded-2xl -z-0" aria-hidden="true" />
          <img
            src={PORTRAIT}
            alt="Ana Beatriz Assis agachada, mexendo no notebook"
            data-testid="about-portrait"
            className="relative z-10 w-full aspect-[4/5] object-cover rounded-3xl"
          />
          <div className="absolute z-20 bottom-6 left-6 bg-[#FBF9F5]/90 backdrop-blur-md rounded-2xl px-5 py-4">
            <p className="font-serif font-bold text-xl text-[#121212]">Ana Beatriz Assis</p>
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
            <span className="w-8 h-px bg-[#6D2932]" /> Sobre
          </p>
          <h2 className="font-serif font-black tracking-tight text-4xl sm:text-5xl mb-6 text-[#121212]">
            Menos ruído,
            <br />
            <em className="bg-[#E8D8C4] px-2 rounded-lg inline-block -rotate-1 not-italic font-script text-[#6D2932] text-5xl sm:text-6xl pr-3">
              mais essência.
            </em>
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Sou a Bia, brand designer e diretora de arte
            com cerca de 10 anos de estrada. Especializada em branding e
            identidades visuais, meu foco é desenvolver marcas autênticas, que
            buscam seu propósito e sua voz no mundo.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-10">
            Minha paixão é criar soluções limpas e eficazes para mídia digital
            e impressa, sempre pensadas em quem está do outro lado. Formada em
            Design, com especialização em Branding pela agência Ana Couto e
            passagens por agências como VCRP, Mediccont e Myne sempre
            aprendendo para fazer a diferença em cada projeto.
          </p>

          <FolderStack />
        </motion.div>
      </div>
    </div>
  </section>
);
