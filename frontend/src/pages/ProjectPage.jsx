import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { API, WHATSAPP_URL } from "@/config";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [all, setAll] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
    setStatus("loading");
    Promise.all([axios.get(`${API}/projects/${id}`), axios.get(`${API}/projects`)])
      .then(([p, list]) => {
        setProject(p.data);
        setAll(list.data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  const { prev, next } = useMemo(() => {
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1 || all.length < 2) return { prev: null, next: null };
    return {
      prev: all[(idx - 1 + all.length) % all.length],
      next: all[(idx + 1) % all.length],
    };
  }, [all, id]);

  return (
    <main className="min-h-screen" data-testid="project-page">
      <div className="noise-overlay" aria-hidden="true" />

      <header className="border-b border-[rgba(18,18,18,0.08)] bg-[rgba(251,249,245,0.85)] backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="project-nav-logo">
            <Logo size={32} />
            <span className="font-serif text-xl tracking-tight">
              bia assis<span className="text-[#121212]">®</span>
            </span>
          </Link>
          <Link
            to="/"
            data-testid="project-back-link"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar ao portfólio
          </Link>
        </div>
      </header>

      {status === "loading" && (
        <div className="flex items-center justify-center py-40" data-testid="project-loading">
          <Loader2 size={28} className="animate-spin text-neutral-400" />
        </div>
      )}

      {status === "error" && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-40 text-center" data-testid="project-not-found">
          <h1 className="font-serif text-4xl mb-4">Projeto não encontrado</h1>
          <p className="text-neutral-500 mb-8">Ele pode ter sido removido da galeria.</p>
          <Link
            to="/"
            className="bg-[#121212] text-[#FBF9F5] px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#121212] transition-colors"
          >
            Voltar ao portfólio
          </Link>
        </div>
      )}

      {status === "ok" && project && (
        <>
          <article className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.25em] text-[#6D2932] mb-5 flex items-center gap-3"
              data-testid="project-category"
            >
              <span className="w-8 h-px bg-[#121212]" /> {project.category}
            </motion.p>

            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-end mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif font-bold tracking-tight leading-[1.05] text-4xl sm:text-6xl"
                data-testid="project-title"
              >
                {project.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:border-l lg:border-[rgba(18,18,18,0.1)] lg:pl-8"
                data-testid="project-meta"
              >
                {project.client && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Cliente</p>
                    <p className="text-sm mt-1">{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Ano</p>
                    <p className="text-sm mt-1">{project.year}</p>
                  </div>
                )}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Entrega</p>
                  <p className="text-sm mt-1">{project.category}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden bg-[#FBF9F5] mb-14"
            >
              <img
                src={project.image_url}
                alt={project.title}
                data-testid="project-image"
                className="w-full max-h-[78vh] object-cover"
              />
            </motion.div>

            {project.description && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-4">
                  Sobre o projeto
                </p>
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-neutral-700" data-testid="project-description">
                  {project.description}
                </p>
              </motion.div>
            )}
          </article>

          <section className="bg-[#121212] text-[#FBF9F5] py-16 sm:py-20" data-testid="project-cta">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <h2 className="font-serif text-3xl sm:text-4xl max-w-md">
                Gostou? Sua marca pode ser a <em className="underline decoration-2 underline-offset-8">próxima.</em>
              </h2>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="project-cta-whatsapp"
                className="shrink-0 bg-[#FBF9F5] text-[#121212] px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-white transition-colors duration-300 flex items-center gap-3 w-fit"
              >
                Chamar no WhatsApp
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              </a>
            </div>
          </section>

          {(prev || next) && (
            <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-2 gap-4" data-testid="project-prevnext">
              {prev && (
                <Link
                  to={`/projeto/${prev.id}`}
                  data-testid="project-prev-link"
                  className="group border border-[rgba(18,18,18,0.1)] rounded-2xl p-6 hover:border-[#121212] transition-colors"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2 mb-2">
                    <ArrowLeft size={12} /> Projeto anterior
                  </p>
                  <p className="font-serif text-xl group-hover:text-[#121212] transition-colors">{prev.title}</p>
                </Link>
              )}
              {next && (
                <Link
                  to={`/projeto/${next.id}`}
                  data-testid="project-next-link"
                  className="group border border-[rgba(18,18,18,0.1)] rounded-2xl p-6 hover:border-[#121212] transition-colors text-right"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 flex items-center justify-end gap-2 mb-2">
                    Próximo projeto <ArrowRight size={12} />
                  </p>
                  <p className="font-serif text-xl group-hover:text-[#121212] transition-colors">{next.title}</p>
                </Link>
              )}
            </nav>
          )}
        </>
      )}

      <FloatingWhatsApp />
    </main>
  );
}
